import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../assets/Gemini_Generated_Image_jpb76tjpb76tjpb72.png";

// ===== Styled Components =====

const NavContainer = styled.nav`
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
  padding: 14px 40px;
  backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.85);
  border-bottom: 1px solid var(--border-color);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 10px 20px;
  }
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  gap: 10px;
`;

const LogoImage = styled.img`
  height: 42px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.08);
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 24px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: var(--dark-text);
  text-decoration: none;
  font-weight: 500;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    color: var(--primary-blue);
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -4px;
    width: 0%;
    height: 2px;
    background: var(--primary-blue);
    border-radius: 2px;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const NavButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ActionButton = styled.button`
  background: var(--primary-blue);
  color: var(--soft-white);
  border: none;
  border-radius: 30px;
  padding: 8px 22px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: var(--secondary-blue);
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 123, 255, 0.3);
  }
`;

const ProfileIcon = styled(Link)`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: var(--primary-blue);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;

  span {
    height: 3px;
    width: 25px;
    background-color: var(--dark-text);
    border-radius: 2px;
    transition: all 0.3s ease;
  }

  &.open span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }

  &.open span:nth-child(2) {
    opacity: 0;
  }

  &.open span:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 260px;
  height: 100vh;
  background: var(--card-background);
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.12);
  padding-top: 90px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  align-items: center;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
  opacity: ${({ open }) => (open ? 1 : 0)};
  transition: transform 0.4s ease, opacity 0.4s ease;
  z-index: 999;
`;

const MobileNavLink = styled(Link)`
  font-size: 18px;
  color: var(--dark-text);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;

  &:hover {
    color: var(--primary-blue);
  }
`;

// ===== Component =====

const Navbar = ({ isLoggedIn, onOpenAuthModal, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const profileInitial = "P"; // Replace with user's first letter

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

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
          {isLoggedIn ? (
            <>
              <ProfileIcon to="/profile">{profileInitial}</ProfileIcon>
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
          {[
            { label: "Home", to: "/" },
            { label: "Dashboard", to: "/dashboard" },
            { label: "Expenses", to: "/expenses" },
            { label: "Tools", to: "/tools" },
            { label: "Recommendations", to: "/recommendations" },
            { label: "Emergency", to: "/emergency" },
          ].map(({ label, to }) => (
            <MobileNavLink key={to} onClick={toggleMobileMenu} to={to}>
              {label}
            </MobileNavLink>
          ))}
          {isLoggedIn ? (
            <MobileNavLink
              onClick={() => {
                onLogout();
                toggleMobileMenu();
              }}
              to="#"
            >
              Log Out
            </MobileNavLink>
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
