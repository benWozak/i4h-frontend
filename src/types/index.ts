export interface ImageProps {
  id: string;
  url: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  sizes: {
    thumbnail: {
      url: string;
      width: number;
      height: number;
    };
    card: {
      url: string;
      width: number;
      height: number;
    };
    tablet: {
      url: string;
      width: number;
      height: number;
    };
  };
  createdAt: string;
  updatedAt: string;
  alt?: string;
}

export interface HeroProps {
  headline: string;
  subline?: string;
  textPlacement: "center" | "bottom-left" | "bottom-right";
  scrim: boolean;
  background: {
    type: "none" | "image" | "carousel" | "video";
    viewportHeight: "full" | "partial";
    image?: {
      url: string;
      alt: string;
      width: number;
      height: number;
    };
    useParallax?: boolean;
    carousel?: { url: string; alt: string }[];
    video?: { url: string };
  };
}