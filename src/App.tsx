import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Landing from "./components/Landing";
import Login from "./pages/Login";
import Header from "./pages/Header";
import Signup from "./pages/SignUp";
import Footer from "./pages/Footer";
import Chat from "./components/Chat";
import Home from "./pages/Home";

const AppWrapper: React.FC = () => {
  const location = useLocation();

  // Lifted modal states
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const showHeader =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/landing" ||
    location.pathname === "/" ||
    location.pathname === "/chat";

  const showFooter =
    location.pathname === "/landing" || location.pathname === "/chat";

  return (
    <>
      {showHeader && (
        <Header
          isLoginOpen={isLoginOpen}
          setIsLoginOpen={setIsLoginOpen}
          isSignupOpen={isSignupOpen}
          setIsSignupOpen={setIsSignupOpen}
        />
      )}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/landing"
          element={<Landing setIsLoginOpen={setIsLoginOpen} />}
        />
        <Route path="/chat" element={<Chat />} />
        <Route path="/" element={<Home />} />
      </Routes>

      {showFooter && <Footer />}
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
};

export default App;
