import imagePlaceholder from "@/assets/placeholder-image.webp";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

// Lista de rutas de imágenes (deben estar en public/images)
const images = [
  "https://picsum.photos/id/1047/1080/1080.webp",
  "https://picsum.photos/id/1013/1080/1080.webp",
  "https://picsum.photos/id/390/1080/1080.webp",
  "https://picsum.photos/id/658/1080/1080.webp",
  "https://picsum.photos/id/217/1080/1080.webp",
  "https://picsum.photos/id/458/1080/1080.webp",
  "https://picsum.photos/id/715/1080/1080.webp",
  "https://picsum.photos/id/218/1080/1080.webp",
  "https://picsum.photos/id/616/1080/1080.webp",
  "https://picsum.photos/1080.webp",
];

type ImageGalleryProps = {
  scrollPosition: { x: number; y: number };
};

const ImageGallery = ({ scrollPosition }: ImageGalleryProps) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Galería de Imágenes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((src, index) => (
          <LazyLoadImage
            key={index}
            src={src}
            width={360}
            height={360}
            alt={`Imagen ${index + 1}`}
            className="w-full h-auto rounded shadow-md"
            effect="blur"
            scrollPosition={scrollPosition}
            placeholderSrc={imagePlaceholder}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
