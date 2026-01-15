import { JSX } from "react";

export interface ScreenGroup {
  title: string;
  images: string[];
}
export interface ProductDetailData {
  id: string;
  logoText: string;
  logoYo?: string;
  logoHaku?: string;
  logoSvg?: string;
  summary?: JSX.Element;
  role?: string;
  keyPoints?: JSX.Element;
  githubUrl?: string;
  techStack: string[][];
  screens: ScreenGroup[];
}
