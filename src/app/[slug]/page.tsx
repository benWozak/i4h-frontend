import { notFound } from "next/navigation";
import { Metadata } from "next";
import Hero from "@/components/layout/Hero";
import { HeroProps } from "@/types";

interface PageData {
  name: string;
  slug: string;
  hero?: HeroProps;
}

async function getPage(slug: string): Promise<PageData | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/pages?where[slug][equals]=${slug}`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch page");
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

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const page = await getPage(params.slug);
  if (!page) {
    return {
      title: "Page Not Found",
    };
  }
  return {
    title: page.name,
  };
}

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/pages`);
  const pages = await res.json();

  return pages.docs.map((page: PageData) => ({
    slug: page.slug,
  }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const page = await getPage(params.slug);

  if (!page) {
    notFound();
  }

  return (
    <div>
      {page.hero && (
        <Hero
          headline={page.hero.headline}
          subline={page.hero.subline}
          textPlacement={page.hero.textPlacement}
          scrim={page.hero.scrim}
          background={page.hero.background}
        />
      )}
      <main className="p-8">
        <h1>{page.name}</h1>
      </main>
    </div>
  );
}
