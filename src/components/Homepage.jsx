import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import financeImage from "../assets/finance.jpeg";

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Montserrat", sans-serif;
  background: linear-gradient(135deg, #f6f9fc 0%, #eef3f8 100%);
  min-height: 100vh;
  color: #2c3e50;
  overflow-x: hidden;
`;

const HeroSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 40px;

  @media (max-width: 1024px) {
    padding: 80px 30px;
  }

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    text-align: center;
    padding: 60px 20px;
  }
`;

const HeroText = styled.div`
  flex: 1;
  max-width: 550px;
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const HeroTitle = styled.h1`
  font-size: 58px;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 20px;
  color: #1b263b;

  @media (max-width: 768px) {
    font-size: 40px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 20px;
  line-height: 1.6;
  margin-bottom: 40px;
  color: #5c6c7c;

  @media (max-width: 768px) {
    font-size: 17px;
  }
`;

const CTAGroup = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const PrimaryButton = styled.button`
  padding: 14px 36px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(0, 123, 255, 0.3);
  transition: all 0.3s ease;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-3px);
    box-shadow: 0 12px 28px rgba(0, 123, 255, 0.4);
  }
`;

const SecondaryButton = styled(Link)`
  padding: 14px 36px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 16px;
  border: 2px solid #007bff;
  color: #007bff;
  background-color: transparent;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background-color: #007bff;
    color: #fff;
    transform: translateY(-3px);
  }
`;

const HeroImage = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  animation: float 5s ease-in-out infinite;

  img {
    width: 100%;
    max-width: 480px;
    height: auto;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(44, 62, 80, 0.15);
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-8px);
    }
  }
`;

const Section = styled.section`
  padding: 80px 20px;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;

  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 40px;
  color: #1b263b;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const CardRow = styled.div`
  display: flex;
  gap: 25px;
  overflow-x: auto;
  padding-bottom: 10px;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  justify-content: center;

  & > * {
    flex-shrink: 0;
    width: 300px;
    scroll-snap-align: center;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  width: 100%;
`;

const FeatureCard = styled.div`
  background-color: #fff;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 36px rgba(0, 0, 0, 0.12);
  }

  h3 {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 12px;
    color: #007bff;
  }

  p {
    font-size: 16px;
    color: #5c6c7c;
    line-height: 1.5;
  }
`;

const Homepage = () => {
  // Trigger signup modal (handled in App.jsx)
  const openSignupModal = () => {
    window.dispatchEvent(new CustomEvent("open-signup"));
  };

  return (
    <HomePageContainer>
      {/* Hero Section */}
      <HeroSection>
        <HeroText>
          <HeroTitle>Smarter Credit & Finance Solutions</HeroTitle>
          <HeroSubtitle>
            Take control of loans, investments, and expenses with Cibilize —
            your modern financial planning hub for better financial growth.
          </HeroSubtitle>
          <CTAGroup>
            <PrimaryButton onClick={openSignupModal}>Get Started</PrimaryButton>
            <SecondaryButton to="/tools">Explore Tools</SecondaryButton>
          </CTAGroup>
        </HeroText>

        <HeroImage>
          <img src={financeImage} alt="Finance illustration" />
        </HeroImage>
      </HeroSection>

      {/* Calculators Section */}
      <Section>
        <SectionTitle>Our Financial Calculators</SectionTitle>
        <CardRow>
          <FeatureCard>
            <h3>EMI Calculator</h3>
            <p>
              Estimate your monthly loan installments with ease and accuracy.
            </p>
          </FeatureCard>
          <FeatureCard>
            <h3>SIP Calculator</h3>
            <p>
              Plan your mutual fund investments with future value projections.
            </p>
          </FeatureCard>
          <FeatureCard>
            <h3>Lumpsum Calculator</h3>
            <p>Visualize the future value of one-time investments easily.</p>
          </FeatureCard>
        </CardRow>
      </Section>

      {/* Benefits Section */}
      <Section>
        <SectionTitle>Why Choose Cibilize?</SectionTitle>
        <CardGrid>
          <FeatureCard>
            <h3>Save Time</h3>
            <p>Instant financial insights for faster and smarter planning.</p>
          </FeatureCard>
          <FeatureCard>
            <h3>Better Decisions</h3>
            <p>Compare, analyze, and make confident financial moves.</p>
          </FeatureCard>
          <FeatureCard>
            <h3>Smart Planning</h3>
            <p>Achieve long-term goals with AI-assisted insights and tools.</p>
          </FeatureCard>
        </CardGrid>
      </Section>
    </HomePageContainer>
  );
};

export default Homepage;
