// 写真アセットの解決ロジック。
// Vite の import.meta.glob で src/assets/images 配下の画像を一括登録し、
// 「ファイルがあればそのURL／無ければ null（→ CSSグラデーション代替）」を返す。
// → 後から写真を assets/images に置くだけで自動反映できる（差し替え一発）。
const modules = import.meta.glob('../assets/images/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const map: Record<string, string> = {};
for (const [path, url] of Object.entries(modules)) {
  const file = path.split('/').pop() ?? '';
  const base = file.replace(/\.(jpg|jpeg|png|webp)$/i, '');
  map[base] = url;
}

/** 基底ファイル名（拡張子なし）から画像URLを取得。無ければ null。 */
export function getImage(name: string): string | null {
  return map[name] ?? null;
}

/** 写真があれば「暗幕グラデ＋写真」、無ければ undefined（SCSS側の代替に委ねる） */
export function photoStyle(name: string, overlay = 'rgba(10,8,5,.45), rgba(10,8,5,.45)') {
  const url = getImage(name);
  return url
    ? { backgroundImage: `linear-gradient(${overlay}), url(${url})` }
    : undefined;
}
