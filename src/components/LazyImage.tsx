import { useEffect, useRef, useState } from "react";

type LazyImageProps = {
  src: string;
  alt: string;
};

const LazyImage = ({ src, alt }: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false); // Estado para controlar la carga de la imagen
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Efecto para cargar la imagen solo cuando es visible en pantalla
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoaded(true); // Activar la carga de la imagen
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <img
      ref={imgRef}
      src={isLoaded ? src : ""} // Solo cargar src cuando la imagen esté visible
      alt={alt}
      loading="lazy"
      className={`w-full h-auto transition-opacity duration-500 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`} // Transición suave
    />
  );
};

export default LazyImage;
