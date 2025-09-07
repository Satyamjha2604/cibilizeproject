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

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setTheme(darkTheme);
    }
  }, []);

  const toggleTheme = () => {
    if (theme === lightTheme) {
      setTheme(darkTheme);
      localStorage.setItem("theme", "dark");
    } else {
      setTheme(lightTheme);
      localStorage.setItem("theme", "light");
    }
  };

  const handleOpenAuthModal = (type) => {
    setAuthFormType(type);
    setShowAuthModal(true);
  };

  const handleCloseAuthModal = () => {
    setShowAuthModal(false);
  };

  const handleToggleForm = () => {
    setAuthFormType((prevType) => (prevType === "login" ? "signup" : "login"));
  };

  const handleLogin = (token) => {
    setIsLoggedIn(true);
    localStorage.setItem("token", token);
    handleCloseAuthModal();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
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
            <Route path="/signup-flow" element={<Homepage />} />{" "}
            {/* This route is no longer needed with the modal */}
            {isLoggedIn && (
              <Route
                path="/dashboard"
                element={<Dashboard onLogout={handleLogout} />}
              />
            )}
            {isLoggedIn && (
              <Route
                path="/expenses"
                element={<Expenses onLogout={handleLogout} />}
              />
            )}
            {isLoggedIn && <Route path="/tools" element={<Tools />} />}
            {isLoggedIn && <Route path="/emergency" element={<Emergency />} />}
            {isLoggedIn && <Route path="/profile" element={<Profile />} />}
            {isLoggedIn && (
              <Route
                path="/recommendations"
                element={<CreditCardRecommendations />}
              />
            )}
            <Route path="*" element={<Homepage />} />
          </Routes>
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
