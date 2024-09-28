import React from "react";
import Image from "next/image";

interface HeroProps {
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

export default function Hero({
  headline,
  subline,
  textPlacement,
  scrim,
  background,
}: HeroProps) {
  const textClasses = {
    center: "items-center justify-center text-center",
    "bottom-left": "items-end justify-start text-left pb-8 pl-8",
    "bottom-right": "items-end justify-end text-right pb-8 pr-8",
  }[textPlacement];

  const backgroundClasses =
    background.type === "none" ? "bg-gray-100" : "bg-gray-900";

  return (
    <div
      className={`relative min-h-[50vh] w-full overflow-hidden ${backgroundClasses}`}
    >
      {background.type === "image" && background.image && (
        <Image
          src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}${background.image.url}`}
          alt={background.image.alt || ""}
          width={background.image.width}
          height={background.image.height}
          layout="responsive"
          objectFit="cover"
        />
      )}
      {background.type === "carousel" && background.carousel && (
        // Implement carousel logic here
        <div>Carousel placeholder</div>
      )}
      {background.type === "video" && background.video && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={background.video.url} type="video/mp4" />
        </video>
      )}
      {scrim && background.type !== "none" && (
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      )}
      <div className={`absolute inset-0 flex flex-col ${textClasses}`}>
        <h1
          className={`text-4xl font-bold mb-4 ${
            background.type === "none" ? "text-gray-900" : "text-white"
          }`}
        >
          {headline}
        </h1>
        {subline && (
          <p
            className={`text-xl ${
              background.type === "none" ? "text-gray-700" : "text-white"
            }`}
          >
            {subline}
          </p>
        )}
      </div>
    </div>
  );
}
