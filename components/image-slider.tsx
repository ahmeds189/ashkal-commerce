"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import type SwiperType from "swiper";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ImageSlider({ urls }: { urls: string[] }) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [active, setActive] = useState(0);
  const [slideConfig, setSlideConfig] = useState({
    isBeginning: true,
    isEnd: active === (urls.length ?? 0) - 1,
  });

  useEffect(() => {
    swiper?.on("slideChange", ({ activeIndex }) => {
      setActive(activeIndex);
      setSlideConfig({
        isBeginning: activeIndex === 0,
        isEnd: activeIndex === (urls.length ?? 0) - 1,
      });
    });
  }, [swiper, urls]);

  return (
    <div className="group relative">
      <div className="absolute inset-0 z-10 flex h-full w-full items-center justify-between px-1">
        <Button
          aria-label="previous image"
          size="icon"
          onClick={(e) => {
            e.preventDefault();
            swiper?.slidePrev();
          }}
          className={cn(
            "h-8 w-8 rounded-full opacity-0 transition group-hover:opacity-100",
            slideConfig.isBeginning && "invisible",
          )}
        >
          <ChevronLeft />
        </Button>
        <Button
          aria-label="next image"
          size="icon"
          onClick={(e) => {
            e.preventDefault();
            swiper?.slideNext();
          }}
          className={cn(
            "h-8 w-8 rounded-full opacity-0 transition group-hover:opacity-100",
            slideConfig.isEnd && "invisible",
          )}
        >
          <ChevronRight />
        </Button>
      </div>
      <Swiper
        onSwiper={(swiper) => setSwiper(swiper)}
        slidesPerView={1}
        spaceBetween={50}
        modules={[Pagination]}
        pagination={{
          clickable: true,
          renderBullet: (_, className) =>
            `<span class="rounded-full transition ${className}"></span>`,
        }}
      >
        {urls.map((url, i) => (
          <SwiperSlide key={i} className="relative aspect-square">
            <Image
              src={url}
              fill
              priority
              loading="eager"
              alt="product image"
              className="rounded-xl object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
