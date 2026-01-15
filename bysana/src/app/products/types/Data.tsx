import { ProductDetailData } from "./domin/ProductDetailData";

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
      "バーコードで書籍を読み取り、簡単に貸し借り。\n" +
      "タグ付けや統計の相性診断などの機能を備えた書籍管理アプリ",
    icon: "/assets/products/libra.svg",
    awards: ["シスハック Nextend賞", "技育博出展"],
    color: "#d4a574",
  },
  {
    id: "moviefes",
    title: "ムービーフェス",
    description:
      "映画祭のレッドカーペットを舞台にした、体感型ゲーム。現れるカメラマンやアイテムをゲットしてゴールへと進みます。",
    icon: "/assets/products/moveifes.svg",
    awards: [
      "東京ゲームショウ2024",
      "ゲームマーケット2024",
      "eフェスNEXT2024",
      "bitSummit2025",
    ],
    color: "#c73434ff",
  },
  {
    id: "sleepGuard",
    title: "Sleep-Guard",
    description:
      "AI顔認識技術を活用した居眠り防止Chrome拡張機能。居眠り検知で、アラート/壁紙変更/連携したスマホの外カメで授業の様子を自動撮影。",
    icon: "/assets/products/sleepGard.png",
    awards: ["個人制作", "デジタルコンテンツ演習"],
    color: "#FFEDB1",
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
        技育展にて、
        <span style={{ color: "#22c55e", fontWeight: 600 }}>
          サイバーエージェント賞
        </span>
        をいただきました！
        <br />
        友人同士で「余白（空き時間）」を共有し、スムーズに予定を立てるためのSNSアプリです。
        <br />
        「いつヒマ？」と一人ひとりに聞いたり、グループチャットを遡る手間はもう必要ありません。
        <br />
        自分の空き時間を投稿するだけで、カレンダー上でフレンドと共有され、
        <br />
        気になった投稿からそのままメッセージを送って約束を取り付けることができます。
        <br />
        リアルな関係性のフレンド限定にすることで、安心して「ヒマ」をさらけ出せる、
        <br />
        新しいつながりの場を提供します。
        <br />
        現在、リリースを目指して継続開発を行なっています。
      </>
    ),
    role: "フロントエンド",
    githubUrl: "https://github.com/yohaku-space",
    techStack: [
      ["React", "Next.js", "jotai", "tauri"],
      ["GO", "webSocket", "AWS", "Figma"],
    ],
    keyPoints: (
      <>
        初めてレイヤードアーキテクチャを採用し、責務を明確に分離することで保守性とテスト容易性を高めました。フロントエンドではネイティブアプリのような操作感を目指し、Jotaiを用いてヘッダーやカレンダーなど4箇所のスクロール連動を集約管理すると同時に、requestAnimationFrameによる描画最適化で滑らかな動作を実現しています。また、「引っ張ってリロード」には物理的な抵抗感を再現した独自の制御を実装し、細部まで「心地よい手触り」を追求しました。
      </>
    ),
    screens: [
      {
        title: "",
        images: [
          "/assets/yohaku/1.png",
          "/assets/yohaku/2.jpg",
          "/assets/yohaku/3.jpg",
          "/assets/yohaku/4.png",
        ],
      },
    ],
  },
  librarium: {
    id: "librarium",
    logoText: "Librarium",
    logoSvg: "/assets/products/libra.svg",
    summary: (
      <>
        SysHack2025にて開発・受賞した、サークル内の書籍管理を効率化しつつ
        <br />
        メンバー間の交流を促進するアプリです。
        <br />
        Rakuten
        Booksなど3種のAPIを統合してバーコードによる瞬時の貸出管理を実現し、
        <br />
        さらに貸出履歴からメンバーの技術スキルを可視化することでハッカソンのチーム結成を支援する仕組みを構築しました。PWA化による高速な操作感やGemini
        APIを活用したAI書籍診断も搭載し、
        <br />
        単なる管理ツールを超えたコミュニティハブとして設計しています。
      </>
    ),
    role: "フロントエンド/デザイン",
    githubUrl: "https://github.com/nrak126/librarium",
    techStack: [
      ["React", "Next.js", "supabase"],
      ["api routes", "Figma"],
    ],
    keyPoints: (
      <>
        デザイン面では、茶色で統一感を出し、直感的にわかりやすいUIにしました。
        <br />
        「何を読めばいいかわからない」という初学者のために、GeminiAPIを組み込みました。
        <br />
        チャット形式の診断結果から、サークルの蔵書の中から最適な一冊をレコメンドする機能を実装し、学習のきっかけ作りをサポートしています。
      </>
    ),
    screens: [
      {
        title: "",
        images: [
          "/assets/librarium/1.png",
          "/assets/librarium/2.png",
          "/assets/librarium/3.png",
          "/assets/librarium/4.png",
        ],
      },
    ],
  },
  moviefes: {
    id: "moviefes",
    logoText: "ムービーフェス",
    logoSvg: "/assets/products/moveifes.svg",
    summary: (
      <>
        プレイヤーが映画スターとなり、フィットネスマシンを操作して
        <br />
        レッドカーペットを完走するゲームです。
        <br />
        キーボードやコントローラーではなく、プレイヤー自身の体の向きで直感的に操作します。
        <br />
        これにより、ゲームへの没入感と運動効果を同時に提供します。
        <br />
        道中には「パパラッチ（カメラマン）」や「ファンからのアイテム」が出現します。
        <br />
        これらをタイミングよく獲得することでポイントが加算され、ゴール時の賞のランクが決まります。
        <br />
        また、ファンやカメラマンに対して手を動かしてアクションを行うため、
        <br />
        自然と体幹の運動にもなります。
      </>
    ),
    techStack: [["OpenGL", "C++"]],
    keyPoints: (
      <>
        単調になりがちなフィットネスマシンの運動を、カメラのフラッシュや歓声というフィードバックを
        <br />
        与えることで、楽しく継続できるエンタメ体験に変えました。
      </>
    ),
    screens: [
      {
        title: "",
        images: [
          "/assets/movie/screen1.png",
          "/assets/movie/screen2.png",
          "/assets/movie/screen3.png",
          "/assets/movie/screen4.png",
        ],
      },
    ],
  },
  sleepGuard: {
    id: "sleepGuard",
    logoText: "Sleep-Guard",
    logoSvg: "/assets/products/sleepGard.png",
    summary: (
      <>
        『SleepGuard』は、AI顔認識技術を活用した居眠り防止Chrome拡張機能です。
        <br />
        PCカメラで居眠りを検知すると、アラートや壁紙変更で覚醒を促すだけでなく、連携したスマホの外カメラで授業の板書を自動撮影します。これにより、寝ている間に進んでしまった授業内容の見落としを防ぎます。また、教員向け画面によりクラスの集中度を可視化し、適切な休憩判断をサポートする機能も搭載しています。
      </>
    ),
    techStack: [
      [
        "Chrome Extension (Manifest V3)",
        "JavaScript",
        "face-api.js",
        "Pusher (WebSocket)",
      ],
    ],
    keyPoints: (
      <>
        PCのChrome拡張機能と、スマートフォンのブラウザをWebSocket（Pusher）でリアルタイムに接続しました。
        ユーザーIDを使ってペアリングし、PC側で居眠りを検知した瞬間にサーバー経由で信号を送り、タイムラグなしでスマホのカメラを遠隔操作する仕組みを構築しています。
      </>
    ),
    screens: [
      {
        title: "スマホ画面",
        images: [
          "/assets/sleepGard/phone1.jpg",
          "/assets/sleepGard/phone2.jpg",
        ],
      },
      {
        title: "PC拡張機能",
        images: [
          "/assets/sleepGard/pc1.png",
          "/assets/sleepGard/pc2.png",
          "/assets/sleepGard/pc3.png",
          "/assets/sleepGard/pc4.png",
        ],
      },
      {
        title: "教員用ダッシュボード",
        images: [
          "/assets/sleepGard/dashboard1.png",
          "/assets/sleepGard/dashboard2.png",
        ],
      },
    ],
  },
};
export { productsData, productDetailsData };
