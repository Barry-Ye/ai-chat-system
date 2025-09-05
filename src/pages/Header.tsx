import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import logo from "../assets/logo.png";
import Modal from "../components/Modal";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

interface HeaderProps {
  isLoginOpen: boolean;
  setIsLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSignupOpen: boolean;
  setIsSignupOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({
  isLoginOpen,
  setIsLoginOpen,
  isSignupOpen,
  setIsSignupOpen,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const [isLogin, setIsLogin] = useState(true);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogout = () => {
    setIsLogin(false);
  };

  const menuItems = ["Home", "About", "Services", "Contact"];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogin = (email: string, password: string) => {
    if (email === "barry" && password === "111") {
      setDropdownOpen(false);
      setIsLoginOpen(false);
      setIsLogin(true);
      setLoginError(null);
      navigate("/home");
    } else {
      setLoginError("Invalid email or password");
    }
  };

  const handleSignup = (fullName: string, email: string, password: string) => {
    alert(`Signed up: ${fullName} (${email})${password}`);
    setIsSignupOpen(false);
  };

  const openSignupFromLogin = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(true);
  };

  const openLoginFromSignup = () => {
    setIsSignupOpen(false);
    setIsLoginOpen(true);
  };

  return (
    <header className="w-full bg-black shadow-sm py-4 px-20 flex items-center justify-between relative">
      <img src={logo} alt="Logo" className="h-14 w-auto" />

      <ul className="hidden md:flex space-x-8 text-[#d1d5db] font-medium text-lg items-center">
        {menuItems.map((item) => (
          <li key={item}>
            <a
              href={`#${item.toLowerCase()}`}
              className="relative group hover:text-white transition-colors duration-300"
            >
              {item}
              <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </a>
          </li>
        ))}

        {isLogin ? (
          <li className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center justify-center w-full px-4 py-2 border border-white rounded-full hover:bg-gray-800 transition-colors duration-300 text-white font-semibold cursor-pointer"
            >
              <span className="mx-2">Bounce Aung</span>
              <span className="text-lg">&#x25BC;</span>
            </button>

            {dropdownOpen && (
              <ul className="absolute right-0 mt-2 w-40 bg-black border border-gray-700 rounded-md shadow-lg py-2 z-50">
                <li
                  className="px-4 py-2 hover:bg-gray-800 cursor-pointer"
                  onClick={() => navigate("/profile")}
                >
                  Profile
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-800 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </li>
                <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer">
                  Settings
                </li>
              </ul>
            )}
          </li>
        ) : location.pathname !== "/landing" && !isLogin ? (
          <li>
            <button
              onClick={() => setIsLoginOpen(true)}
              className="relative group hover:text-white transition-colors duration-300 font-medium text-lg"
            >
              Login
              <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </button>
          </li>
        ) : null}
      </ul>

      {/* Login Modal */}
      <Modal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)}>
        <LoginForm
          onLogin={handleLogin}
          error={loginError}
          onSignupClick={openSignupFromLogin}
        />
      </Modal>

      {/* Signup Modal */}
      <Modal isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)}>
        <SignupForm onSignup={handleSignup} onLoginClick={openLoginFromSignup} />
      </Modal>
    </header>
  );
};

export default Header;
