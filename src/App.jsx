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

// 🧠 Import AI Assistant
import ChatAssistant from "./components/ChatAssistant.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authFormType, setAuthFormType] = useState("signup");
  const [theme, setTheme] = useState(lightTheme);
  const [showChat, setShowChat] = useState(false); // 🧠 toggle chat visibility

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

          {/* 🧠 Floating AI Chat Assistant */}
          <div
            style={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              zIndex: 2000,
            }}
          >
            {showChat ? (
              <div
                style={{
                  position: "relative",
                  width: "350px",
                  height: "auto",
                  backgroundColor: "#fff",
                  borderRadius: "16px",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                }}
              >
                <button
                  onClick={() => setShowChat(false)}
                  style={{
                    position: "absolute",
                    top: "8px",
                    right: "10px",
                    background: "transparent",
                    border: "none",
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                >
                  ✖
                </button>
                <ChatAssistant />
              </div>
            ) : (
              <button
                onClick={() => setShowChat(true)}
                style={{
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "50%",
                  width: "60px",
                  height: "60px",
                  cursor: "pointer",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                  fontSize: "26px",
                }}
              >
                🤖
              </button>
            )}
          </div>
        </main>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
