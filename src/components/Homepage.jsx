import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import financeImage from "../assets/finance.jpeg";

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Montserrat", sans-serif;
  background-color: var(--background, #f0f4f8);
  min-height: 100vh;
  padding: 60px 40px;

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const HeroSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 50px;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 0;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 40px 0;
  }
`;

const HeroText = styled.div`
  flex: 1;
  max-width: 600px;
`;

const HeroTitle = styled.h1`
  font-size: 64px;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 20px;
  color: var(--dark-text, #2c3e50);

  @media (max-width: 768px) {
    font-size: 40px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 20px;
  line-height: 1.6;
  margin-bottom: 30px;
  color: var(--light-text, #5c6c7c);

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const CTAGroup = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: flex-start;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const PrimaryButton = styled(Link)`
  padding: 14px 32px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 16px;
  background-color: var(--primary-blue, #007bff);
  color: #fff;
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
  transition: background-color 0.3s ease, transform 0.2s ease,
    box-shadow 0.3s ease;

  &:hover {
    background-color: var(--secondary-blue, #0056b3);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 123, 255, 0.4);
  }
`;

const SecondaryButton = styled(Link)`
  padding: 14px 32px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 16px;
  border: 2px solid var(--primary-blue, #007bff);
  color: var(--primary-blue, #007bff);
  background-color: transparent;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--primary-blue, #007bff);
    color: #fff;
    transform: translateY(-2px);
  }
`;

const HeroImage = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;

  img {
    max-width: 100%;
    height: auto;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(44, 62, 80, 0.1);
  }
`;

const Section = styled.section`
  padding: 80px 20px;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 40px;
  color: var(--dark-text, #2c3e50);
`;

// Horizontal scroll row for calculators
const CardRow = styled.div`
  display: flex;
  gap: 30px;
  overflow-x: auto;
  padding-bottom: 20px;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;

  & > * {
    flex-shrink: 0;
    width: 280px; /* fixed card width */
    scroll-snap-align: center;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

// Column grid for Cibilize benefits
const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* single column on mobile */
  }
`;

const FeatureCard = styled.div`
  background-color: var(--card-background, #fff);
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 6px 18px rgba(44, 62, 80, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 8px 24px rgba(44, 62, 80, 0.15);
  }

  h3 {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 12px;
    color: var(--primary-blue, #007bff);
  }

  p {
    font-size: 16px;
    color: var(--light-text, #5c6c7c);
  }
`;

const Homepage = () => {
  return (
    <HomePageContainer>
      {/* Hero Section */}
      <HeroSection>
        <HeroText>
          <HeroTitle>Smarter Credit & Finance Solutions</HeroTitle>
          <HeroSubtitle>
            Take control of loans, investments, and expenses with Cibilize —
            your modern financial planning hub.
          </HeroSubtitle>
          <CTAGroup>
            <PrimaryButton to="/signup-flow">Get Started</PrimaryButton>
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
            <p>Estimate your monthly loan installments with ease.</p>
          </FeatureCard>
          <FeatureCard>
            <h3>SIP Calculator</h3>
            <p>Calculate the future value of your mutual fund investments.</p>
          </FeatureCard>
          <FeatureCard>
            <h3>Lumpsum Calculator</h3>
            <p>Project the future value of one-time investments.</p>
          </FeatureCard>
        </CardRow>
      </Section>

      {/* Cibilize Benefits Section */}
      <Section>
        <SectionTitle>Why Choose Cibilize?</SectionTitle>
        <CardGrid>
          <FeatureCard>
            <h3>Save Time</h3>
            <p>Instant results for your financial planning.</p>
          </FeatureCard>
          <FeatureCard>
            <h3>Better Decisions</h3>
            <p>Compare options and choose wisely for your future.</p>
          </FeatureCard>
          <FeatureCard>
            <h3>Smart Planning</h3>
            <p>Maximize savings with accurate projections.</p>
          </FeatureCard>
        </CardGrid>
      </Section>
    </HomePageContainer>
  );
};

export default Homepage;
