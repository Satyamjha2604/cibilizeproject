import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const FooterContainer = styled.footer`
  background-color: var(--primary-blue);
  color: white;
  padding: 4rem 2rem;
  font-family: "Montserrat", sans-serif;

  --primary-blue: #007bff;
  --secondary-blue: #0056b3;
  --dark-text: #2c3e50;
  --light-text: #5c6c7c;
  --soft-white: #f8f9fa;
  --card-background: #ffffff;
  --border-color: #e0e6ed;
  --box-shadow: rgba(44, 62, 80, 0.1);
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  text-align: left;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SiteName = styled.h4`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
`;

const Tagline = styled.p`
  font-size: 1rem;
  opacity: 0.8;
  margin: 0;
`;

const QuickLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

const LinkItem = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SocialLink = styled.a`
  color: white;
  transition: color 0.3s ease;

  &:hover {
    color: var(--soft-white);
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

const Separator = styled.div`
  height: 1px;
  background-color: rgba(255, 255, 255, 0.2);
  margin: 2rem auto;
  width: 100%;
  max-width: 1200px;
`;

const Copyright = styled.p`
  text-align: center;
  font-size: 0.8rem;
  opacity: 0.7;
  margin: 0;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <SiteName>Cibilize</SiteName>
          <Tagline>Credit Made Clear, Growth Made Easy</Tagline>
        </FooterSection>
        <FooterSection>
          <h5
            style={{
              fontWeight: "600",
              marginBottom: "1rem",
              fontSize: "1.2rem",
            }}
          >
            Quick Links
          </h5>
          <QuickLinks>
            <LinkItem to="/">Home</LinkItem>
            <LinkItem to="/tools">Tools</LinkItem>
            <LinkItem to="/about">About</LinkItem>
            <LinkItem to="/contact">Contact</LinkItem>
          </QuickLinks>
        </FooterSection>
        <FooterSection>
          <h5
            style={{
              fontWeight: "600",
              marginBottom: "1rem",
              fontSize: "1.2rem",
            }}
          >
            Follow Us
          </h5>
          <SocialIcons>
            <SocialLink
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.768s.784-1.768 1.75-1.768 1.75.79 1.75 1.768-.784 1.768-1.75 1.768zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </SocialLink>
            <SocialLink
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.795-1.574 2.164-2.722-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.122 0-5.64 2.52-5.64 5.638 0 .445.05.876.134 1.291-4.68-2.35-8.81-4.976-11.594-8.08-.474.817-.75 1.76-.75 2.775 0 1.95.994 3.67 2.502 4.688-.92-.03-1.783-.28-2.546-.7-.006.027-.006.05-.006.074 0 2.724 1.94 4.996 4.5 5.514-.47.129-.96.195-1.46.195-.357 0-.705-.034-1.045-.1.714 2.22 2.793 3.84 5.253 3.883-1.923 1.5-4.34 2.1-6.97.085-.386.23-.77.41-1.166.52a10.668 10.668 0 0 0 6.132 1.832c7.35 0 11.36-6.096 11.36-11.398 0-.174-.004-.347-.012-.52.784-.567 1.46-1.276 2-2.09z" />
              </svg>
            </SocialLink>
            <SocialLink
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.373 3.431 9.358 8.131 10.941.749.143 1.026-.328 1.026-.739 0-.365-.015-1.332-.02-2.617-3.321.722-4.02-1.609-4.02-1.609-.54-1.365-1.319-1.723-1.319-1.723-1.079-.733.082-.718.082-.718 1.192.085 1.815 1.226 1.815 1.226 1.06 1.814 2.78 1.294 3.456.993.108-.775.416-1.294.757-1.591-2.645-.295-5.429-1.321-5.429-5.889 0-1.299.462-2.355 1.223-3.182-.122-.296-.532-1.503.116-3.149 0 0 1.002-.322 3.284 1.229 1.059-.294 2.181-.441 3.299-.446 1.119.005 2.24.152 3.299.446 2.28-1.551 3.28-1.229 3.28-1.229.649 1.646.239 2.853.117 3.149.762.827 1.222 1.883 1.222 3.182 0 4.588-2.788 5.592-5.441 5.883.427.369.813 1.101.813 2.222 0 1.59-.015 2.868-.02 3.259 0 .415.276.892 1.036.749 4.701-1.608 8.13-5.567 8.13-10.941c-.001-6.627-5.374-12-12.001-12z" />
              </svg>
            </SocialLink>
          </SocialIcons>
        </FooterSection>
      </FooterContent>
      <Separator />
      <Copyright>© 2025 Cibilize. All rights reserved.</Copyright>
    </FooterContainer>
  );
};

export default Footer;
