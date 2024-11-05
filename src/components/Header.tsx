import { Button } from "@/components/ui/button";

type HeaderProps = {
  isDashboard?: boolean;
};

const Header = ({ isDashboard = false }: HeaderProps) => {
  return (
    <header className="w-full bg-white shadow py-4">
      <nav className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-3xl font-bold text-[rgb(255,92,53)]">
          Bibliophile
        </h1>
        <div className="flex space-x-4">
          {isDashboard ? (
            <Button
              variant="ghost"
              className="text-gray-700 hover:text-[rgb(255,92,53)]"
            >
              Cerrar sesión
            </Button>
          ) : (
            <>
              <Button
                variant="ghost"
                className="text-gray-700 hover:text-[rgb(255,92,53)] hidden md:inline"
              >
                Iniciar sesión
              </Button>
              <Button className="bg-[rgb(255,92,53)] text-white font-semibold hover:bg-[rgb(255,120,70)]">
                Prueba Gratis
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
