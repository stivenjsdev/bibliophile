import imagePlaceholder from "@/assets/placeholder-image.webp";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

type ImageGalleryProps = {
  scrollPosition: { x: number; y: number };
};

const CustomerReviews = ({ scrollPosition }: ImageGalleryProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-8">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6 max-w-xs">
          <LazyLoadImage
            key={index}
            src={`https://picsum.photos/id/${Math.floor(
              Math.random() * 999 + 1
            )}/360/360.webp`}
            width={270}
            height={270}
            alt={`Imagen ${index + 1}`}
            className="w-full h-auto rounded shadow-md"
            effect="blur"
            scrollPosition={scrollPosition}
            placeholderSrc={imagePlaceholder}
          />
          <p className="text-[rgb(119,119,119)] mb-4">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          </p>
          <p className="font-bold text-[rgb(34,34,34)]">Cliente {index + 1}</p>
        </div>
      ))}
    </div>
  );
};

export default CustomerReviews;
