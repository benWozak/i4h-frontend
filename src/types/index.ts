export type HeroProps = {
  headline: string;
  subline?: string;
  textPlacement: "center" | "bottom-left" | "bottom-right";
  scrim: boolean;
  background: {
    type: "none" | "image" | "carousel" | "video";
    image?: {
      url: string;
      alt: string;
      width: number;
      height: number;
    };
    carousel?: { url: string; alt: string }[];
    video?: { url: string };
  };
}