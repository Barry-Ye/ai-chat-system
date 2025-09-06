import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.png";
import Modal from "../components/Modal";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import ProfileMenu from "../components/ProfileMenu";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LoginIcon from "@mui/icons-material/Login";
import { Button, IconButton } from "@mui/material";

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
  const [isLogin, setIsLogin] = useState(true);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = ["Home", "About", "Services", "Contact"];

  const handleLogin = (email: string, password: string) => {
    if (email === "barry" && password === "111") {
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
    <header className="w-full bg-gray-900 shadow-sm py-4 px-6 md:px-20 flex items-center justify-between relative">
      {/* LEFT: Logo */}
      <div className="flex-shrink-0">
        <img src={logo} alt="Logo" className="h-14 w-auto" />
      </div>

      {/* CENTER: Navigation Links */}
      <ul className="hidden md:flex space-x-10 text-[#d1d5db] font-medium text-lg items-center">
        {menuItems.map((item) => (
          <li key={item}>
            <a
              href={`#${item.toLowerCase()}`}
              className="relative group hover:text-white transition-colors duration-300"
            >
              {item}
              <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-gray-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </a>
          </li>
        ))}
      </ul>

      {/* RIGHT: ProfileMenu or Login */}
      <div className="hidden md:flex items-center space-x-4">
        {isLogin ? (
          <ProfileMenu
            setIsLogin={setIsLogin}
          />
        ) : location.pathname !== "/landing" && !isLogin ? (
          <Button
            variant="contained"
            startIcon={<LoginIcon sx={{ fontSize: 24 }} />} // increase size here
            onClick={() => setIsLoginOpen(true)}
            className="!bg-gray-600 !text-white 
                     !rounded-full !shadow-2xl 
                     !px-6 !py-2 
                     hover:!bg-gray-700 
                     active:scale-95 
                     transition-all duration-200"
            sx={{
              textTransform: "none",
              fontSize: "0.875rem",
              fontWeight: 500,
            }}
          >
            Login
          </Button>
        ) : null}
      </div>

      {/* Mobile Hamburger */}
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        className="md:!hidden text-gray-200 hover:text-white"
        onClick={() => setMobileMenuOpen(true)}
      >
        <MenuIcon fontSize="large" />
      </IconButton>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="w-64 bg-gray-900 h-full shadow-lg p-6 flex flex-col space-y-6">
            {/* Close */}
            <button
              className="self-end text-gray-300 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <CloseIcon />
            </button>

            {/* Nav Links */}
            {menuItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-300 hover:text-white text-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}

            {/* Login / Profile on Mobile */}
            {isLogin ? (
              <ProfileMenu
                setIsLogin={setIsLogin}

              />
            ) : (
              <button
                onClick={() => {
                  setIsLoginOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="text-white bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}

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
