import { useEffect, useState } from "react";

const useScrollToTop = () => {
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);

  // Manejar la visibilidad del botón de scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTopButton(window.scrollY > 300); // Mostrar si el scroll es mayor a 300px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Función para hacer scroll al inicio de la página
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return { showScrollTopButton, scrollToTop };
};

export default useScrollToTop;
