import { JSX } from "react";

// ProductDetail用の型定義
export interface ProductDetailData {
  id: string;
  logoText: string;
  logoYo?: string;
  logoHaku?: string;
  logoSvg?: string;
  summary?: JSX.Element;
  techStack: string[][];
  screens: string[];
}

const productsData = [
  {
    id: "yohaku",
    title: "Yo haku",
    titleYo: "Yo",
    titleHaku: "haku",
    description:
      "自分やフレンドの空き時間を交換・共有し、カレンダーやチャット機能で予定調整をスムーズに行えるアプリ",
    icon: "image/products/yohaku.svg",
    githubUrl: "https://github.com/yourusername/yohaku",
  },
  {
    id: "librarium",
    title: "Librarium",
    description:
      "バーコードで書籍を読み取り、簡単に貸し借り。タグ付けや統計の相性診断などの機能を備えた書籍管理アプリ",
    icon: "image/products/libra.svg",
    githubUrl: "https://github.com/yourusername/librarium",
  },
  {
    id: "moviefes",
    title: "ムービーフェス",
    description:
      "映画祭をモチーフに、映像やアイテム、カメラマンなどの演出要素を操作しながらフィットネス×エンタメ×インターフェース...",
    icon: "image/products/moviefes.svg",
    githubUrl: "https://github.com/yourusername/moviefes",
  },
];

const productDetailsData: Record<string, ProductDetailData> = {
  yohaku: {
    id: "yohaku",
    logoText: "Yo haku",
    logoYo: "Yo",
    logoHaku: "haku",
    logoSvg: "image/products/yohaku.svg",
    summary: (
      <>
        技育キャンプvol.4で制作し、
        <span style={{ color: "#d4a574", fontWeight: 600 }}>最優秀賞</span>
        をいただきました!
        <br />
        「Yo
        haku」は、空き時間(余白)を投稿・共有し、友達と簡単に予定を立てられるアプリ
        <br />
        カレンダー連携やチャット機能などがあります。
      </>
    ),
    techStack: [
      ["React", "Next.js", "jotai"],
      ["webSocket", "firebase", "firestore", "authentication"],
    ],
    screens: [
      "image/yohaku/1.png",
      "image/yohaku/2.png",
      "image/yohaku/3.png",
      "image/yohaku/4.png",
    ],
  },
  librarium: {
    id: "librarium",
    logoText: "Librarium",
    logoSvg: "image/products/libra.svg",
    summary: (
      <>
        システムハックで制作し、
        <span style={{ color: "#d4a574", fontWeight: 600 }}>技育博</span>
        に出展することが決定しました!
        <br />
        バーコードで書籍を読み取り、簡単に登録・貸し借りでき、スキルのタグ付けや技術書の相性診断などの機能を備えた書籍管理アプリ
      </>
    ),
    techStack: [
      ["React", "Next.js", "supabase"],
      ["api routes", "Figma"],
    ],
    screens: [
      "image/librarium/1.png",
      "image/librarium/2.png",
      "image/librarium/3.png",
      "image/librarium/4.png",
    ],
  },
  moviefes: {
    id: "moviefes",
    logoText: "ムービーフェス",
    logoSvg: "image/products/moviefes.svg",
    summary: (
      <>
        映画祭をモチーフに、映像やアイテム、カメラマンなどの演出要素を操作しながら
        <br />
        フィットネス×エンタメ×インターフェースの新しい体験を提供するアプリ
      </>
    ),
    techStack: [
      ["React", "Next.js", "Three.js"],
      ["WebGL", "Animation", "Motion Capture"],
    ],
    screens: [
      "image/moviefes/1.png",
      "image/moviefes/2.png",
      "image/moviefes/3.png",
      "image/moviefes/4.png",
    ],
  },
};
export { productsData, productDetailsData };
