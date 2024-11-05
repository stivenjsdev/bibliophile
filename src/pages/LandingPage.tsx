import heroImage from "@/assets/hero-image.webp";
import CustomerReviews from "@/components/CustomerReviews";
import Header from "@/components/Header";
import useScrollToTop from "@/hooks/useScrollToTop";
import { lazy } from "react";
import {
  LazyLoadComponent,
  LazyLoadImage,
  trackWindowScroll,
} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const LazyComponent = lazy(() => import("@/components/LazyComponent"));

type LandingPageProps = {
  scrollPosition: { x: number; y: number };
};

const LandingPage = ({ scrollPosition }: LandingPageProps) => {
  const { scrollToTop, showScrollTopButton } = useScrollToTop();

  return (
    <div className="min-h-screen bg-[rgb(254,244,234)] flex flex-col">
      {/* Header */}
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="container mx-auto text-center py-12 px-4 md:py-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[rgb(34,34,34)] mb-4">
            Potencia tus Lecturas
          </h2>
          <p className="text-lg text-[rgb(119,119,119)] mb-7">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae nam at
            ratione itaque cupiditate, illo esse quidem optio repudiandae nemo
            vel accusantium, architecto, ab assumenda voluptatum possimus a
            aspernatur delectus mollitia expedita neque sunt est deserunt
            tempore. Quibusdam reprehenderit nulla fugiat? Magnam recusandae
            inventore cumque deserunt nulla omnis itaque repellendus?
          </p>
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
            <button className="px-6 py-3 bg-[rgb(255,92,53)] text-white font-semibold rounded-lg shadow hover:bg-[rgb(255,120,70)]">
              Prueba Gratis
            </button>
            <button className="px-6 py-3 border border-[rgb(255,92,53)] text-[rgb(255,92,53)] font-semibold rounded-lg hover:bg-[rgb(254,244,234)]">
              Ver características
            </button>
          </div>
        </section>

        {/* Informative Sections */}
        <section className="w-full bg-white h-[539px]">
          <div className="container mx-auto py-16 px-4 md:flex md:space-x-8 items-center">
            <div className="flex-1 mb-8 md:mb-0 text-center md:text-left">
              <h3 className="text-3xl font-semibold text-[rgb(34,34,34)] mb-4">
                Características Avanzadas
              </h3>
              <p className="text-[rgb(119,119,119)]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                varius metus at eros feugiat fringilla.
              </p>
            </div>
            <div className="w-full md:w-1/2 lg:w-[600px] mx-auto">
              <LazyLoadImage
                alt="Feature illustration"
                // src="https://picsum.photos/600/400.webp"
                src={heroImage}
                scrollPosition={scrollPosition}
                className="rounded-lg shadow-lg w-full h-auto" // Imagen responsive
                // width="100%"
                // height="auto"
                // placeholderSrc="https://placehold.co/600x400.webp"
                visibleByDefault={true}
                // placeholder={<div className="w-[600] h-[400] bg-gray-200 rounded-lg" />}
              />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="container mx-auto py-16 text-center px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-[rgb(34,34,34)] mb-8">
            Nuestros Clientes
          </h2>
          <CustomerReviews scrollPosition={scrollPosition} />
        </section>

        {/* <ImageGallery scrollPosition={scrollPosition} /> */}

        {/* Lazy Component */}
        <LazyLoadComponent
          scrollPosition={scrollPosition}
          placeholder={<div>Loading...</div>}
        >
          <LazyComponent />
        </LazyLoadComponent>
      </main>
      {/* Footer */}
      <LazyLoadComponent scrollPosition={scrollPosition}>
        <footer className="w-full bg-gray-800 py-8 text-gray-200">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4 space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <h4 className="font-bold text-lg mb-2">Empresa</h4>
              <ul className="space-y-1">
                <li>Acerca de</li>
                <li>Contacto</li>
                <li>Blog</li>
              </ul>
            </div>
            <div className="text-center md:text-left">
              <h4 className="font-bold text-lg mb-2">Enlaces</h4>
              <ul className="space-y-1">
                <li>Preguntas frecuentes</li>
                <li>Privacidad</li>
                <li>Términos de servicio</li>
              </ul>
            </div>
            <div className="text-center md:text-left">
              <h4 className="font-bold text-lg mb-2">Síguenos</h4>
              <ul className="flex justify-center md:justify-start space-x-4">
                <li>Facebook</li>
                <li>Twitter</li>
                <li>LinkedIn</li>
              </ul>
            </div>
          </div>
        </footer>
      </LazyLoadComponent>

      {/* Button to return to the beginning */}
      {showScrollTopButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-[rgb(255,92,53)] text-white p-3 rounded-full shadow-lg hover:bg-[rgb(255,120,70)] transition-all duration-300"
          aria-label="Volver al inicio"
        >
          ↑
        </button>
      )}
    </div>
  );
};

const TrackedLandingPage = trackWindowScroll(LandingPage);

export default TrackedLandingPage;
