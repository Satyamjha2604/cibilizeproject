import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ThemeContext } from "styled-components";
import logo from "../assets/Gemini_Generated_Image_jpb76tjpb76tjpb72.png"; // Import your logo here

const NavContainer = styled.nav`
  display: flex;
  justify-content: center;
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
  padding: 20px 50px;
  background-color: var(--card-background);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-color);
  box-shadow: 0 4px 15px var(--box-shadow);
  font-family: "Montserrat", sans-serif;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 15px 20px;
  }
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
`;

const LogoImage = styled.img`
  height: 40px;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 30px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: var(--dark-text);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    color: var(--primary-blue);
    transform: translateY(-2px);
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--primary-blue);
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const NavButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ActionButton = styled.button`
  background-color: var(--primary-blue);
  border: none;
  border-radius: 50px;
  padding: 10px 25px;
  color: var(--soft-white);
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 8px var(--box-shadow);
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--secondary-blue);
    box-shadow: 0 6px 12px var(--box-shadow);
    transform: translateY(-2px);
  }
`;

const ProfileIcon = styled(Link)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--primary-blue);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--soft-white);
  font-weight: bold;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const ThemeToggleButton = styled.button`
  background-color: var(--card-background);
  color: var(--dark-text);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 2px 8px var(--box-shadow);
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--soft-white);
    transform: rotate(15deg);
  }
`;

const Hamburger = styled.div`
  display: none;
  cursor: pointer;
  flex-direction: column;
  gap: 6px;

  span {
    height: 3px;
    width: 25px;
    background-color: var(--dark-text);
    border-radius: 2px;
    transition: all 0.3s ease;
  }

  &.open span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 6px);
  }

  &.open span:nth-child(2) {
    opacity: 0;
  }

  &.open span:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -6px);
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobileMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  position: fixed;
  top: 0;
  right: 0;
  width: 250px;
  height: 100vh;
  background-color: var(--card-background);
  box-shadow: -4px 0 10px var(--box-shadow);
  padding-top: 80px;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.4s ease-in-out;
  z-index: 999;
`;

const MobileNavLink = styled(Link)`
  color: var(--dark-text);
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  width: 100%;
  padding: 10px 0;
  text-align: center;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: var(--soft-white);
    color: var(--primary-blue);
  }
`;

const Navbar = ({ isLoggedIn, onOpenAuthModal, onLogout, toggleTheme }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const themeContext = useContext(ThemeContext);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <NavContainer>
      <NavContent>
        <LogoLink to="/">
          <LogoImage src={logo} alt="Cibilize Logo" />
        </LogoLink>
        <NavLinks>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/expenses">Expenses</NavLink>
          <NavLink to="/tools">Tools</NavLink>
          <NavLink to="/recommendations">Recommendations</NavLink>
          <NavLink to="/emergency">Emergency</NavLink>
        </NavLinks>
        <NavButtons>
          <ThemeToggleButton onClick={toggleTheme}>
            {themeContext.mode === "light" ? "🌙" : "☀️"}
          </ThemeToggleButton>
          {isLoggedIn ? (
            <>
              <ProfileIcon to="/profile">P</ProfileIcon>
              <ActionButton onClick={onLogout}>Log Out</ActionButton>
            </>
          ) : (
            <ActionButton onClick={() => onOpenAuthModal("login")}>
              Log In
            </ActionButton>
          )}
        </NavButtons>
        <Hamburger
          onClick={toggleMobileMenu}
          className={mobileMenuOpen ? "open" : ""}
        >
          <span></span>
          <span></span>
          <span></span>
        </Hamburger>
        <MobileMenu open={mobileMenuOpen}>
          <MobileNavLink onClick={toggleMobileMenu} to="/">
            Home
          </MobileNavLink>
          <MobileNavLink onClick={toggleMobileMenu} to="/dashboard">
            Dashboard
          </MobileNavLink>
          <MobileNavLink onClick={toggleMobileMenu} to="/expenses">
            Expenses
          </MobileNavLink>
          <MobileNavLink onClick={toggleMobileMenu} to="/tools">
            Tools
          </MobileNavLink>
          <MobileNavLink onClick={toggleMobileMenu} to="/recommendations">
            Recommendations
          </MobileNavLink>
          <MobileNavLink onClick={toggleMobileMenu} to="/emergency">
            Emergency
          </MobileNavLink>
          {isLoggedIn ? (
            <>
              <MobileNavLink
                onClick={() => {
                  onLogout();
                  toggleMobileMenu();
                }}
                to="#"
              >
                Log Out
              </MobileNavLink>
            </>
          ) : (
            <MobileNavLink
              onClick={() => {
                onOpenAuthModal("login");
                toggleMobileMenu();
              }}
              to="#"
            >
              Log In
            </MobileNavLink>
          )}
        </MobileMenu>
      </NavContent>
    </NavContainer>
  );
};

export default Navbar;
