import { Metadata } from "next";
import { draftMode } from "next/headers";
import Hero from "@/components/layout/Hero";
import { HeroProps } from "@/types";
import Banner from "@/components/blocks/Banner";

interface LandingData {
  siteName: string;
  hero?: HeroProps;
}

async function getLandingData(isDraft: boolean): Promise<LandingData> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/globals/landing-page?depth=2`,
      {
        next: { tags: ["landing-page"], revalidate: isDraft ? 0 : 60 },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch landing data");
    }
    return await res.json();
  } catch (error) {
    console.error(error);
    return {
      siteName: "Default Site Name",
      hero: {
        headline: "Welcome",
        subline: "This is a default hero section",
        textPlacement: "center",
        scrim: false,
        background: { type: "none", viewportHeight: "partial" },
      },
    };
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const { isEnabled: isDraft } = draftMode();
  const landingData = await getLandingData(isDraft);
  return {
    title: landingData.siteName,
  };
}

export default async function Home() {
  const { isEnabled: isDraft } = draftMode();
  const landingData = await getLandingData(isDraft);

  return (
    <div>
      {isDraft && (
        <div className="bg-yellow-100 p-4">
          This page is a preview.{" "}
          <a
            href="/api/disable-draft"
            className="underline hover:text-blue-600"
          >
            Click here
          </a>{" "}
          to exit preview mode.
        </div>
      )}
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
