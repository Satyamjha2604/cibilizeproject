import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/theme.js";
import GlobalStyle from "./styles/GlobalStyles.js";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Homepage from "./components/Homepage.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Tools from "./components/Tools.jsx";
import Emergency from "./components/Emergency.jsx";
import Expenses from "./components/Expenses.jsx";
import AuthModal from "./components/AuthModal.jsx";
import Profile from "./components/Profile.jsx";
import CreditCardRecommendations from "./components/CreditCardRecommendations.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authFormType, setAuthFormType] = useState("signup");
  const [theme, setTheme] = useState(lightTheme);

  // Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setTheme(darkTheme);
  }, []);

  // Theme toggle handler
  const toggleTheme = () => {
    if (theme === lightTheme) {
      setTheme(darkTheme);
      localStorage.setItem("theme", "dark");
    } else {
      setTheme(lightTheme);
      localStorage.setItem("theme", "light");
    }
  };

  // Auth modal controls
  const handleOpenAuthModal = (type) => {
    setAuthFormType(type);
    setShowAuthModal(true);
  };

  const handleCloseAuthModal = () => setShowAuthModal(false);

  const handleToggleForm = () =>
    setAuthFormType((prevType) => (prevType === "login" ? "signup" : "login"));

  // Login & Logout
  const handleLogin = (token) => {
    setIsLoggedIn(true);
    localStorage.setItem("token", token);
    handleCloseAuthModal();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  };

  // Check existing token on app start
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
  }, []);

  // Listen for “open-signup” event from Homepage “Get Started” button
  useEffect(() => {
    const handleOpenSignup = () => handleOpenAuthModal("signup");
    window.addEventListener("open-signup", handleOpenSignup);
    return () => window.removeEventListener("open-signup", handleOpenSignup);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle theme={theme} />
      <Router>
        <Navbar
          isLoggedIn={isLoggedIn}
          onOpenAuthModal={handleOpenAuthModal}
          onLogout={handleLogout}
          toggleTheme={toggleTheme}
        />
        <main>
          <Routes>
            <Route path="/" element={<Homepage />} />
            {isLoggedIn && (
              <>
                <Route
                  path="/dashboard"
                  element={<Dashboard onLogout={handleLogout} />}
                />
                <Route
                  path="/expenses"
                  element={<Expenses onLogout={handleLogout} />}
                />
                <Route path="/tools" element={<Tools />} />
                <Route path="/emergency" element={<Emergency />} />
                <Route path="/profile" element={<Profile />} />
                <Route
                  path="/recommendations"
                  element={<CreditCardRecommendations />}
                />
              </>
            )}
            <Route path="*" element={<Homepage />} />
          </Routes>

          {/* Authentication Modal */}
          <AuthModal
            show={showAuthModal}
            formType={authFormType}
            onClose={handleCloseAuthModal}
            onToggleForm={handleToggleForm}
            onSuccessAuth={handleLogin}
          />
        </main>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
