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