import { JSX } from "react";

export interface Product {
  id: string;
  title: string;
  titleYo?: string; // Yo haku用
  titleHaku?: string; // Yo haku用
  description: string;
  icon?: string;
  awards?: string[];
  color?: string;
}

// ProductDetail型定義
export interface ProductDetailData {
  id: string;
  logoText: string;
  logoYo?: string;
  logoHaku?: string;
  logoSvg?: string;
  summary?: JSX.Element;
  role?: string;
  githubUrl?: string;
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
    icon: "/assets/products/yohaku.svg",
    awards: ["技育キャンプvol.4 最優秀賞", "技育展 Cyberagent賞"],
    color: "#22c55e",
  },
  {
    id: "librarium",
    title: "Librarium",
    description:
      "バーコードで書籍を読み取り、簡単に貸し借り。タグ付けや統計の相性診断などの機能を備えた書籍管理アプリ",
    icon: "/assets/products/libra.svg",
    awards: ["シスハック Nextend賞", "技育博出展"],
    color: "#d4a574",
  },
  {
    id: "moviefes",
    title: "ムービーフェス",
    description:
      "映画祭をモチーフに、映像やアイテム、カメラマンなどの演出要素を操作しながらフィットネス×エンタメ×インターフェース...",
    icon: "/assets/products/moviefes.svg",
    awards: [
      "東京ゲームショウ2024",
      "ゲームマーケット2024",
      "eフェスNEXT2024",
      "bitSummit2025",
    ],
    color: "#ef4444",
  },
];

const productDetailsData: Record<string, ProductDetailData> = {
  yohaku: {
    id: "yohaku",
    logoText: "Yo haku",
    logoYo: "Yo",
    logoHaku: "haku",
    logoSvg: "/assets/products/yohaku.svg",
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
    role: "フロントエンド/デザイン",
    githubUrl: "https://github.com/yourusername/yohaku",
    techStack: [
      ["React", "Next.js", "jotai"],
      ["webSocket", "firebase", "firestore", "authentication"],
    ],
    screens: [
      "/assets/yohaku/1.png",
      "/assets/yohaku/2.png",
      "/assets/yohaku/3.png",
      "/assets/yohaku/4.png",
    ],
  },
  librarium: {
    id: "librarium",
    logoText: "Librarium",
    logoSvg: "/assets/products/libra.svg",
    summary: (
      <>
        システムハックで制作し、
        <span style={{ color: "#d4a574", fontWeight: 600 }}>技育博</span>
        に出展することが決定しました!
        <br />
        バーコードで書籍を読み取り、簡単に登録・貸し借りでき、スキルのタグ付けや技術書の相性診断などの機能を備えた書籍管理アプリ
      </>
    ),
    role: "フロントエンド/デザイン",
    githubUrl: "https://github.com/yourusername/librarium",
    techStack: [
      ["React", "Next.js", "supabase"],
      ["api routes", "Figma"],
    ],
    screens: [
      "/assets/librarium/1.png",
      "/assets/librarium/2.png",
      "/assets/librarium/3.png",
      "/assets/librarium/4.png",
    ],
  },
  moviefes: {
    id: "moviefes",
    logoText: "ムービーフェス",
    logoSvg: "/assets/products/moviefes.svg",
    summary: (
      <>
        映画祭をモチーフに、映像やアイテム、カメラマンなどの演出要素を操作しながら
        <br />
        フィットネス×エンタメ×インターフェースの新しい体験を提供するアプリ
      </>
    ),
    role: "デザイン/実装",
    techStack: [["OpenGL", "C++"]],
    screens: [
      "/assets/moviefes/1.png",
      "/assets/moviefes/2.png",
      "/assets/moviefes/3.png",
      "/assets/moviefes/4.png",
    ],
  },
};
export { productsData, productDetailsData };
