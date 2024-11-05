const Header = () => {
  return (
    <header className="w-full bg-white shadow py-4">
      <nav className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-3xl font-bold text-[rgb(255,92,53)]">
          Bibliophile
        </h1>
        <div className="flex space-x-4">
          <button className="text-gray-700 hover:text-[rgb(255,92,53)] hidden md:inline">
            Iniciar sesión
          </button>
          <button className="px-4 py-2 bg-[rgb(255,92,53)] text-white font-semibold rounded-lg hover:bg-[rgb(255,120,70)]">
            Prueba Gratis
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
