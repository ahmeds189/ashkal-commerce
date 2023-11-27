import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

export default function ImageSlider({ urls }: { urls: string[] }) {
  return (
    <Swiper className="aspect-square overflow-hidden rounded-xl">
      {urls.map((url, i) => (
        <SwiperSlide key={i} className="relative h-8 bg-fuchsia-400">
          <Image
            src={url}
            fill
            alt="product image"
            loading="eager"
            className="object-cover object-center"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
