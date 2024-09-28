import { Metadata } from "next";
import Hero from "@/components/layout/Hero";
import { HeroProps } from "@/types";

interface Props {
  siteName: string;
  hero?: HeroProps;
}

async function getLandingData(): Promise<Props> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/globals/landing-page?depth=2`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch landing data");
  }
  const data = await res.json();
  // console.log("Raw landing data:", JSON.stringify(data, null, 2));

  // If there's an image, fetch its details
  if (data.hero?.background?.type === "image" && data.hero.background.image) {
    const imageId = data.hero.background.image;
    const imageRes = await fetch(
      `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/media/${imageId}`,
      { next: { revalidate: 60 } }
    );
    if (imageRes.ok) {
      const imageData = await imageRes.json();
      data.hero.background.image = {
        url: imageData.url,
        alt: imageData.alt || "",
        width: imageData.width,
        height: imageData.height,
      };
    } else {
      console.error("Failed to fetch image data");
    }
  }
  return data;
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
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start p-8">
        <h1>{landingData.siteName}</h1>
      </main>
    </div>
  );
}
