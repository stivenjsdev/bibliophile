import { useAuth } from "@/hooks/useAuth";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type HeaderProps = {
  isDashboard: boolean;
};

const Header = ({ isDashboard }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      // Handle error (e.g., show a message to the user)
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-[rgb(255,92,53)]">
            Bibliophile
          </Link>
          {!isDashboard && (
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                <Menu className="h-6 w-6 text-[rgb(255,92,53)]" />
              </button>
            </div>
          )}
          <nav
            className={`${
              isDashboard ? "block" : isMenuOpen ? "block" : "hidden"
            } md:block`}
          >
            {isDashboard ? (
              <button
                className="w-full md:w-auto text-center px-6 py-3 border border-[rgb(255,92,53)] text-[rgb(255,92,53)] font-semibold rounded-lg hover:bg-[rgb(255,92,53)] hover:text-white transition-colors duration-200"
                onClick={handleLogout}
              >
                Cerrar sesión
              </button>
            ) : (
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                <Link
                  to="/login"
                  className="text-center px-6 py-3 border border-[rgb(255,92,53)] text-[rgb(255,92,53)] font-semibold rounded-lg hover:bg-[rgb(255,92,53)] hover:text-white transition-colors duration-200"
                >
                  Iniciar sesión
                </Link>
                <Link
                  to="/register"
                  className="text-center px-6 py-3 bg-[rgb(255,92,53)] text-white font-semibold rounded-lg shadow hover:bg-white hover:text-[rgb(255,92,53)] hover:border hover:border-[rgb(255,92,53)] transition-colors duration-200"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
