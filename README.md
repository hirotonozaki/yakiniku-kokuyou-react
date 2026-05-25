# 焼肉 黒耀 — 予約サイト（React + TypeScript 版）

恵比寿の高級焼肉店「焼肉 黒耀」のオンライン予約サイトを、
**React + TypeScript + Vite + SCSS Modules + React Router** で実装したものです。
既存の Vanilla 版（HTML/CSS/JS）のブランド世界観（黒 × 古金色）を踏襲しつつ、
コンポーネント分割・型安全・状態管理を学べる構成にしています。

> ポートフォリオ用の架空店舗デモです。実在の店舗・予約とは関係ありません。

---

## 🛠 使用技術

| 領域 | 技術 |
| :--- | :--- |
| UI | React 18 / TypeScript（strict） |
| ビルド | Vite 5 |
| スタイル | SCSS Modules（コンポーネント単位でスコープ） |
| ルーティング | React Router 6（HashRouter） |
| 状態管理 | React Context（予約フローの状態を共有） |

---

## 🚀 セットアップ

```bash
npm install      # 依存をインストール
npm run dev      # 開発サーバー（http://localhost:5173）
npm run build    # 型チェック（tsc）+ 本番ビルド（dist/）
npm run preview  # ビルド結果をローカル確認
```

> Node.js 18 以上を推奨します。

---

## 📂 ディレクトリ構成

```
src/
├── main.tsx                  # エントリ（HashRouter で App をマウント）
├── App.tsx                   # ルーティング定義
├── styles/
│   ├── _theme.scss           # デザイントークン（色・タイポ・mixin）※全SCSSの土台
│   └── global.scss           # リセット + ベース + .container などの共通ユーティリティ
├── types/index.ts            # 型定義を一元化
├── lib/
│   ├── images.ts             # 画像の自動解決（写真↔グラデ代替の切替）
│   └── format.ts             # 価格・日付・予約番号の整形
├── data/
│   ├── courses.ts            # コース情報（1ソースを各所で再利用）
│   └── reservation.ts        # 人数・時間枠・空席・カレンダー生成ロジック
├── context/
│   └── ReservationContext.tsx# 予約状態をページ横断で共有
├── hooks/
│   └── useInView.ts          # スクロール表示（IntersectionObserver）
├── components/
│   ├── ui/                   # Button / SectionHeading / Reveal（汎用）
│   ├── layout/               # Header / Footer / Layout
│   ├── home/                 # Hero / Concept / CoursePreview / ReserveCta
│   ├── course/               # CourseCard（トップと一覧で共用）
│   └── reserve/              # Calendar / GuestSelector / TimeSelector /
│                             #   CustomerForm / ReservationSummary / StepIndicator
└── pages/                    # Home / Courses / Reserve / Confirm / Complete
```

---

## 🧩 設計の考え方（なぜこの構成か）

### コンポーネント分割
- **責務で分けた**：見た目の汎用部品（`ui/`）、骨組み（`layout/`）、画面固有の塊（`home/` `reserve/`）。
- **再利用を優先**：`CourseCard` はトップのプレビューとコース一覧で共用。
  データ（`data/courses.ts`）も1ソースにし、変更を1箇所で済むようにした。

### 状態管理（なぜ Context か）
- 予約は **予約入力 → 確認 → 完了** と画面をまたぐため、選択内容を保持する必要がある。
- そこで `ReservationContext` に状態と更新関数・入力進捗・必須チェックを集約。
  各ページは `useReservation()` で読み書きするだけでよい。

### 予約UI（なぜこの導線か）
- 一括フォームではなく **日付 → 人数 → 時間 → お客様情報** の段階提示にし、
  「席を選ぶ体験」として心理的負担を下げた。
- 右側の **sticky サマリ＋進捗バー** で「あと何を選べばいいか」を常に可視化。
- 日付を変えたら時間を選び直す等、**整合性のための副作用**も Context 側で吸収。

### スタイル（なぜ SCSS Modules か）
- クラス名がコンポーネント単位でスコープされ、命名衝突を避けられる。
- 色・タイポ・余白・ブレイクポイントは `_theme.scss` に集約し、`@use` で全モジュールから参照。
  → 黒 × 金の世界観を1箇所で管理し、一貫性を担保。

### レスポンシブ
- **モバイルファースト**。`@mixin md (768px)` / `lg (1024px)` で段階的に拡張。
- スマホは `hover` が効かないため、選択は **タップで成立**するボタンUIを採用。

### アクセシビリティ
- `aria-*`、`:focus-visible`、`role="radiogroup"` 等を付与。
- `prefers-reduced-motion` の人にはフェード演出を無効化（`useInView` 内で判定）。

### 工夫点：写真のドロップイン対応
- 写真ファイルが無くても動くよう、`lib/images.ts` で `import.meta.glob` を使い
  「**ファイルがあればそのURL／無ければ null → CSSグラデーション代替**」に自動フォールバック。
- `src/assets/images/` に決まった名前で画像を置くだけで反映される（差し替え一発）。
  → 詳細は `src/assets/images/README.md`。

---

## 🗺 画面と導線

| パス | 画面 | 内容 |
| :--- | :--- | :--- |
| `/` | トップ | Hero / こだわり / コース / 予約CTA |
| `/courses` | コース一覧 | 桐・竹・松の3コース |
| `/reserve` | 予約 | 日付・人数・時間・お客様情報 + 入力進捗 |
| `/reserve/confirm` | 確認 | 入力内容の最終確認 |
| `/reserve/complete` | 完了 | 予約番号の発行・控え表示 |

※ HashRouter のため、本番URLは `…/#/reserve` の形式になります
（静的ホスティングでも更新時に404にならない利点があります）。

---

## 👤 Author

**Hiroto Nozaki** — Web Production / Front-end

---

## 🌐 GitHub への公開手順

### 1. リポジトリを作成して push

```bash
# プロジェクト直下で実行
git init
git add -A
git commit -m "Initial commit: 焼肉 黒耀 予約サイト (React + TypeScript)"
git branch -M main
git remote add origin https://github.com/<ユーザー名>/yakiniku-kokuyou-react.git
git push -u origin main
```

> GitHub 側では空のリポジトリ（README 等を作らずに）を用意しておくとスムーズです。

### 2. GitHub Pages を有効化（自動デプロイ）

1. リポジトリの **Settings → Pages** を開く
2. **Build and deployment → Source** を **「GitHub Actions」** に変更

以降、`main` に push するたびに `.github/workflows/deploy.yml` が
自動でビルド＆デプロイします。公開URLは次の形式です：

```
https://<ユーザー名>.github.io/yakiniku-kokuyou-react/
```

> - `vite.config.ts` の `base: '/yakiniku-kokuyou-react/'` でリポジトリ名のパスを指定しているため、
>   ビルド後の JS/CSS/画像が `…/yakiniku-kokuyou-react/assets/...` を正しく指し、白画面になりません。
>   **リポジトリ名を変える場合は、この `base` も同じ名前に必ず合わせてください。**
> - ルーティングは **HashRouter** のため、予約ページ等のURLは `…/yakiniku-kokuyou-react/#/reserve` の形になります（更新しても404になりません）。

### 補足
- `public/.nojekyll`：GitHub Pages の Jekyll 処理を無効化する保険。
- `npm ci` を使うため `package-lock.json` も同梱・コミット済みです。

### 🩹 白画面（blank）になるときのチェックリスト
GitHub Pages で何も表示されない場合、ほぼ次のいずれかです。

1. **Pages の Source が「GitHub Actions」になっているか**（最重要）
   「Deploy from a branch」のままだと、ビルド前のソース（`/src/main.tsx` を参照する `index.html`）がそのまま配信され、必ず白画面になります。**Source は必ず「GitHub Actions」**にしてください。
2. **`vite.config.ts` の `base` がリポジトリ名と一致しているか**
   `base: '/yakiniku-kokuyou-react/'` ⇄ 公開URL `…/yakiniku-kokuyou-react/` が揃っている必要があります。
3. **ビルドが通っているか**：`npm run build` がエラーなく終わり、`dist/index.html` 内のパスが
   `/yakiniku-kokuyou-react/assets/...` になっているか（`./assets/...` や `/assets/...` だと崩れます）。
4. **反映待ち**：Actions 完了後、反映に数十秒〜数分かかることがあります。ブラウザは強制リロード（Cmd/Ctrl+Shift+R）で確認を。
5. それでも切り分けたいときは、ブラウザの DevTools → Console / Network を開き、**赤い 404（assets の読み込み失敗）が出ていないか**を確認してください。
