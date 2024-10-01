"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { HeroProps } from "@/types";

export default function Hero({
  headline,
  subline,
  textPlacement,
  scrim,
  background,
}: HeroProps) {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (
        parallaxRef.current &&
        background.type === "image" &&
        background.useParallax
      ) {
        const scrollPosition = window.pageYOffset;
        parallaxRef.current.style.transform = `translateY(${
          scrollPosition * 0.5
        }px)`;
      }
    };

    if (background.type === "image" && background.useParallax) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (background.type === "image" && background.useParallax) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [background.type, background.useParallax]);

  const textClasses = {
    center: "items-center justify-center text-center",
    "bottom-left": "items-start justify-end text-left pb-8 pl-8",
    "bottom-right": "items-end justify-end text-right pb-8 pr-8",
  }[textPlacement];

  const backgroundClasses =
    background.type === "none" ? "bg-gray-100" : "bg-gray-900";

  const heightClass =
    background.viewportHeight === "full" ? "h-screen" : "min-h-[50vh]";

  return (
    <div
      className={`w-full overflow-hidden ${backgroundClasses} ${heightClass}`}
    >
      {background.type === "image" && background.image && (
        <div ref={parallaxRef} className="absolute inset-0">
          <Image
            src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}${background.image.url}`}
            alt={background.image.alt || ""}
            layout="fill"
            objectFit="cover"
          />
        </div>
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
      <div className={`absolute inset-0 flex flex-col ${textClasses} mb-8`}>
        <h1
          className={`text-6xl font-bold ${
            background.type === "none" ? "text-gray-900" : "text-white"
          }`}
        >
          {headline}
        </h1>
        {subline && (
          <p
            className={`text-2xl ${
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
