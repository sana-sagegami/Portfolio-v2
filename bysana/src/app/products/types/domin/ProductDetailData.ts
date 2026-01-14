import { JSX } from "react";

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
  screens: string[];
}
