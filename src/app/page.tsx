import { Metadata } from "next";
import Hero from "@/components/layout/Hero";
import { HeroProps } from "@/types";
import Banner from "@/components/blocks/Banner";

interface LandingData {
  siteName: string;
  hero?: HeroProps;
}

const defaultLandingData: LandingData = {
  siteName: "Default Site Name",
  hero: {
    headline: "Welcome",
    subline: "This is a default hero section",
    textPlacement: "center",
    scrim: false,
    background: { type: "none", viewportHeight: "partial" },
  },
};

async function getLandingData(): Promise<LandingData> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/globals/landing-page?depth=2`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch landing data");
    }
    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
    return defaultLandingData;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const landingData = await getLandingData();
  return {
    title: landingData.siteName,
  };
}

export default async function Home() {
  const landingData = await getLandingData();

  return (
    <div>
      {landingData.hero && (
        <Hero
          headline={landingData.hero.headline}
          subline={landingData.hero.subline}
          textPlacement={landingData.hero.textPlacement}
          scrim={landingData.hero.scrim}
          background={landingData.hero.background}
        />
      )}
      <main className="">
        <Banner />
      </main>
    </div>
  );
}
