import ImageGallery from "@/components/ImageGallery";
import LazyComponent from "@/components/LazyComponent";
import {
  LazyLoadComponent,
  trackWindowScroll,
} from "react-lazy-load-image-component";

type LandingPageProps = {
  scrollPosition: { x: number; y: number };
};

const LandingPage = ({ scrollPosition }: LandingPageProps) => {
  return (
    <div className="container mx-auto p-4 flex flex-col gap-4">
      <h1 className="text-2xl font-bold mb-4">Bienvenido a la Landing Page</h1>

      {/* Usamos LazyLoadComponent para cargar LazyComponent cuando sea visible */}
      <LazyLoadComponent scrollPosition={scrollPosition}>
        <LazyComponent />
      </LazyLoadComponent>

      {/* Galería de imágenes que usa trackWindowScroll para lazy loading eficiente */}
      <ImageGallery scrollPosition={scrollPosition} />

      {/* Usamos LazyLoadComponent para cargar LazyComponent cuando sea visible */}
      <LazyLoadComponent scrollPosition={scrollPosition}>
        <LazyComponent />
      </LazyLoadComponent>
    </div>
  );
};

const TrackedLandingPage = trackWindowScroll(LandingPage);

export default TrackedLandingPage;
