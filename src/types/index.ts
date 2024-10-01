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

export interface NavProps {
  id: number
  items: NavItem[]
  updatedAt: string
  createdAt: any
  globalType: string
}

export interface NavItem {
  id: string
  label: string
  type: string
  dropdownItems: DropdownItem[]
  link: any
}

export interface DropdownItem {
  id: string
  label: string
  isPrimary: any
  description: any
  link: Link
}

export interface Link {
  id: number
  name: string
  slug: string
  hero: any[]
  seo: any[]
  updatedAt: string
  createdAt: string
}
export interface BrandProps {
  id: number
  companyLogo: ImageProps
  brandColors: BrandColors
  socialLinks: SocialLinkProps
  updatedAt: string
  createdAt: any
  globalType: string
}

export interface BrandColors {
  primary: string
  secondary: string
}

export interface SocialLinkProps {
  facebook: string
  instagram: string
  twitter: string
  linkedin: string
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