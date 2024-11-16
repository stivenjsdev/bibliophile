import heroImage from "@/assets/hero-image.webp";
import imagePlaceholder from '@/assets/placeholder-image.webp';
import CustomerReviews from "@/components/CustomerReviews";
import LazyComponent from "@/components/LazyComponent";
import useScrollToTop from "@/hooks/useScrollToTop";
import {
  LazyLoadComponent,
  LazyLoadImage,
  trackWindowScroll,
} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

type LandingPageProps = {
  scrollPosition: { x: number; y: number };
};

const LandingPage = ({ scrollPosition }: LandingPageProps) => {
  const { scrollToTop, showScrollTopButton } = useScrollToTop();

  return (
    <div className="min-h-screen bg-[rgb(254,244,234)] flex flex-col">
      {/* Hero Section */}
      <section className="container mx-auto text-center py-12 px-4 md:py-16">
        <h2 className="text-3xl md:text-5xl font-bold text-[rgb(34,34,34)] mb-4">
          Potencia tus Lecturas
        </h2>
        <p className="text-lg text-[rgb(119,119,119)] mb-7">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae nam at
          ratione itaque cupiditate, illo esse quidem optio repudiandae nemo vel
          accusantium, architecto, ab assumenda voluptatum possimus a aspernatur
          delectus mollitia expedita neque sunt est deserunt tempore. Quibusdam
          reprehenderit nulla fugiat? Magnam recusandae inventore cumque
          deserunt nulla omnis itaque repellendus?
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
      <section className="w-full bg-white flex justify-center py-6 px-4">
        <div className="container flex flex-col gap-4 justify-between items-center md:flex-row md:gap-6">
          {/* Content */}
          <div className="flex flex-col gap-2 items-center flex-1">
            <h3 className="text-3xl font-semibold text-[rgb(34,34,34)]">
              Características Avanzadas
            </h3>
            <p className="text-[rgb(119,119,119)] text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
              ipsa reiciendis, ipsam blanditiis nostrum doloremque repellendus
              sapiente ab. Totam, voluptas aut ab debitis dolorum ducimus
              maiores corporis eaque perspiciatis! Aliquam eum dolor aspernatur
              praesentium magnam rerum repellat soluta nulla, vero quasi sit
              ipsum quam amet dignissimos eveniet itaque harum omnis ducimus
              sequi dolores consectetur? Est, ea! In fuga, dolor repellendus
              iusto facere doloremque praesentium error pariatur magnam rem
              eligendi accusamus a, qui ducimus deleniti, obcaecati velit eaque
              delectus quidem dicta. Doloremque itaque quia ratione quibusdam
              enim esse exercitationem autem voluptatibus? Aspernatur, inventore
              laboriosam. Officia fugit magnam sequi veniam at distinctio.
            </p>
          </div>
          {/* Hero Image */}
          <div className="flex-1 flex justify-center">
            <div className="bg-neutral-300 rounded-md shadow-lg overflow-hidden aspect-[3/2] max-w-[600px]">
              <LazyLoadImage
                alt="Feature illustration"
                width={600}
                height={400}
                src={heroImage}
                scrollPosition={scrollPosition}
                className="object-cover"
                visibleByDefault={true}
                placeholderSrc={imagePlaceholder}
              />
              {/* <img
                src={heroImage}
                alt="Feature illustration"
                width={600}
                height={400}
                className="object-cover"
                loading="lazy"
              /> */}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-10 px-4 flex justify-center">
        <div className="container flex flex-col gap-6 items-center">
          <h2 className="text-3xl font-bold text-[rgb(34,34,34)] text-center">
            Nuestros Clientes
          </h2>
          <p className="text-[rgb(119,119,119)] text-justify mb-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam ipsa
            reiciendis, ipsam blanditiis nostrum doloremque repellendus sapiente
            ab. Totam, voluptas aut ab debitis dolorum ducimus maiores corporis
            eaque perspiciatis! Aliquam eum dolor aspernatur praesentium magnam
            rerum repellat soluta nulla, vero quasi sit ipsum quam amet
            dignissimos eveniet itaque harum omnis ducimus sequi dolores
            consectetur? Est, ea! In fuga, dolor repellendus iusto facere
            doloremque praesentium error pariatur magnam rem eligendi accusamus
            a, qui ducimus deleniti, obcaecati velit eaque delectus quidem
            dicta. Doloremque itaque quia ratione quibusdam enim esse
            exercitationem autem voluptatibus? Aspernatur, inventore laboriosam.
            Officia fugit magnam sequi veniam at distinctio.
          </p>
          <CustomerReviews scrollPosition={scrollPosition} />
        </div>
      </section>

      {/* Lazy Component */}
      <LazyLoadComponent
      // placeholder={<div>Loading...</div>}
      >
        <LazyComponent />
      </LazyLoadComponent>

      {/* Footer */}
      <LazyLoadComponent>
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
