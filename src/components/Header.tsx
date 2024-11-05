import { Link } from "react-router-dom";

type HeaderProps = {
  isDashboard: boolean;
};

const Header = ({ isDashboard }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-[rgb(255,92,53)]">
          Bibliophile
        </Link>
        <nav>
          {isDashboard ? (
            <Link to="/" className="text-primary hover:text-primary-dark">
              Salir
            </Link>
          ) : (
            <Link
              to="/dashboard"
              className="text-primary hover:text-primary-dark"
            >
              Dashboard
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
