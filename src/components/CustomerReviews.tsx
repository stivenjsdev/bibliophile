import imagePlaceholder from "@/assets/placeholder-image.webp";
import { useMemo } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

type ImageGalleryProps = {
  scrollPosition: { x: number; y: number };
};

const CustomerReviews = ({ scrollPosition }: ImageGalleryProps) => {
  const clientImages = useMemo(
    () => [
      {
        id: 1,
        src: `https://picsum.photos/id/${Math.floor(
          Math.random() * 999 + 1
        )}/370/370.webp`,
      },
      {
        id: 2,
        src: "https://picsum.photos/id/961/370/370.webp",
      },
      {
        id: 3,
        src: "https://picsum.photos/id/509/370/370.webp",
      },
      {
        id: 4,
        src: "https://picsum.photos/id/534/370/370.webp",
      },
      {
        id: 5,
        src: "https://picsum.photos/id/218/370/370.webp",
      },
      {
        id: 6,
        src: "https://picsum.photos/id/196/370/370.webp",
      },
      {
        id: 7,
        src: "https://picsum.photos/id/681/370/370.webp",
      },
      {
        id: 8,
        src: "https://picsum.photos/id/501/370/370.webp",
      },
    ],
    []
  );
  return (
    <div className="flex flex-wrap justify-center gap-8">
      {clientImages.map((image) => (
        <div
          key={image.id + "container"}
          className="bg-white rounded-lg shadow-md p-6 max-w-xs flex flex-col items-center gap-4"
        >
          <div className="bg-neutral-300 rounded shadow-md overflow-hidden aspect-square max-w-[270px]">
            <LazyLoadImage
              key={image.id + "image"}
              src={image.src}
              width={270}
              height={270}
              alt={`Imagen Client ${image.id}`}
              className="object-cover"
              effect="blur"
              scrollPosition={scrollPosition}
              placeholderSrc={imagePlaceholder}
            />
          </div>
          <p className="text-[rgb(119,119,119)] mb-4 text-center">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          </p>
          <p className="font-bold text-[rgb(34,34,34)]">Cliente {image.id}</p>
        </div>
      ))}
    </div>
  );
};

export default CustomerReviews;
