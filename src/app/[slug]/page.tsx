import { draftMode } from "next/headers";
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

async function getPage(slug: string): Promise<PageData | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/pages?where[slug][equals]=${slug}`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch page");
  }
  const data = await res.json();

  return data.docs[0];
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
  const { isEnabled: isDraft } = draftMode();

  console.log(page);

  if (!page) {
    notFound();
  }

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
