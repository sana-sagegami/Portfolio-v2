import { remark } from "remark";
import html from "remark-html";

// alt が空でない画像は <figure> + <figcaption> にして、画像の下に説明文を表示する
function withCaptions(h: string) {
  return h.replace(
    /<p><img src="([^"]*)" alt="([^"]+)"([^>]*)><\/p>/g,
    '<figure><img src="$1" alt="$2"$3><figcaption>$2</figcaption></figure>',
  );
}

// ![alt](URL =300x) / =300x200 / =x200 のサイズ指定は、そのままだとリンクとして解釈されないため、
// いったん URL の #size=WxH に退避し、HTML 化のあとで width/height 属性に変換する
function stashSizes(md: string) {
  return md.replace(
    /(!\[[^\]]*\]\(\s*[^)\s]+)\s+=(\d*)x(\d*)\s*\)/g,
    (m, head, w, h) => (w || h ? `${head}#size=${w}x${h})` : m),
  );
}

function applySizes(h: string) {
  return h.replace(
    /<img src="([^"]*)#size=(\d*)x(\d*)" alt="([^"]*)">/g,
    (_, src, w, ht, alt) =>
      `<img src="${src}" alt="${alt}"${w ? ` width="${w}"` : ""}${ht ? ` height="${ht}"` : ""}>`,
  );
}

const processor = remark().use(html);

// サーバー(記事ページ)とブラウザ(編集プレビュー)で共通に使う
export function renderMarkdown(content: string): string {
  return withCaptions(applySizes(processor.processSync(stashSizes(content)).toString()));
}
