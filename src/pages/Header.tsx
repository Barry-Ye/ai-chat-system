import React from "react";
import logo from "../assets/logo.png"; // replace with your logo path

const Header = () => {
  return (
    <header className="w-full bg-black shadow-sm py-4 px-6 flex items-center">
      <img src={logo} alt="Logo" className="h-14 w-auto" />
    </header>
  );
};

export default Header;
