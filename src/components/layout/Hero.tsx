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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (
        parallaxRef.current &&
        containerRef.current &&
        background.type === "image" &&
        background.useParallax
      ) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const scrollPosition = window.scrollY;
        const containerTop = containerRect.top + scrollPosition;
        const containerBottom = containerRect.bottom + scrollPosition;
        const viewportHeight = window.innerHeight;

        if (
          scrollPosition + viewportHeight > containerTop &&
          scrollPosition < containerBottom
        ) {
          const relativeScroll = scrollPosition - containerTop;
          const parallaxSpeed = 0.3;
          parallaxRef.current.style.transform = `translateY(${
            relativeScroll * parallaxSpeed
          }px)`;
        }
      }
    };

    if (background.type === "image" && background.useParallax) {
      window.addEventListener("scroll", handleScroll);
      handleScroll(); // Initial call to set the position
    }

    return () => {
      if (background.type === "image" && background.useParallax) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [background.type, background.useParallax]);

  const getTextClasses = () => {
    const baseClasses = "flex flex-col";
    const alignmentClasses = {
      center: "items-center justify-center text-center",
      "bottom-left": "items-start justify-end text-left",
      "bottom-right": "items-end justify-end text-right",
    }[textPlacement];

    const paddingClasses =
      background.viewportHeight === "full"
        ? "p-8"
        : textPlacement === "center"
        ? "p-8"
        : textPlacement === "bottom-left"
        ? "pb-8 pl-8"
        : "pb-8 pr-8";

    return `${baseClasses} ${alignmentClasses} ${paddingClasses}`;
  };

  const backgroundClasses =
    background.type === "none" ? "bg-gray-100" : "bg-gray-900";

  const heightClass =
    background.viewportHeight === "full" ? "h-[90vh]" : "h-[50vh]";

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden ${backgroundClasses} ${heightClass}`}
    >
      {background.type === "image" && background.image && (
        <div ref={parallaxRef} className="absolute inset-0 h-[120%] -top-[10%]">
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
      <div className={`relative z-10 h-full ${getTextClasses()}`}>
        <h1
          className={`text-6xl font-bold ${
            background.type === "none" ? "text-gray-900" : "text-white"
          }`}
        >
          {headline}
        </h1>
        {subline && (
          <p
            className={`text-2xl mt-4 ${
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
