# 画像アセットの置き場所

ここに写真ファイルを置くと、`src/lib/images.ts` の `import.meta.glob` が
自動で読み込み、各セクションに反映されます（ファイルが無い間は黒×金の
グラデーションで代替表示されます）。

## 期待するファイル名（拡張子は .jpg / .webp / .png いずれも可）

| ファイル名（拡張子なし） | 使用箇所 |
| :--- | :--- |
| `hero-main`        | トップ Hero の背景 |
| `concept-wagyu`    | こだわり 01（A5和牛） |
| `concept-charcoal` | こだわり 02（炭火） |
| `concept-room`     | こだわり 03（個室） |
| `course-kiri`      | 桐コースのサムネ |
| `course-take`      | 竹コースのサムネ |
| `course-matsu`     | 松コースのサムネ |
| `reserve-bg`       | 予約CTAバンドの背景 |

例：`hero-main.jpg` をこのフォルダに置くだけで Hero に反映されます。
