import { notFound } from "next/navigation";
import { Metadata } from "next";
import Hero from "@/components/layout/Hero";
import { fetchWithRetry } from "@/lib/utils";
import { HeroProps } from "@/types";

interface PageData {
  name: string;
  slug: string;
  hero?: HeroProps;
}

// const defaultPageData: PageData = {
//   name: "Default Page",
//   slug: "default",
//   hero: {
//     headline: "Default Page",
//     subline: "This is a default page hero section",
//     textPlacement: "center",
//     scrim: false,
//     background: { type: "none", viewportHeight: "partial" },
//   },
// };

async function getPage(slug: string): Promise<PageData | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/pages?where[slug][equals]=${slug}`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch page");
  }
  const data = await res.json();

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
  const pages = await fetchWithRetry<{ docs: PageData[] }>(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/pages`,
    { cache: "force-cache" }
  );

  return (
    pages?.docs.map((page: PageData) => ({
      slug: page.slug,
    })) || []
  );
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
