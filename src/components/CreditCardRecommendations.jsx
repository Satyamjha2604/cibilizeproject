import React, { useState } from "react";
import styled from "styled-components";

const RecommendationsContainer = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: "Montserrat", sans-serif;

  @media (max-width: 992px) {
    padding: 20px;
  }
`;

const PageTitle = styled.h2`
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 20px;
  color: var(--primary-blue);
`;

const QuestionCard = styled.div`
  &.card-container {
    width: 100%;
    max-width: 700px;
    padding: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const QuestionText = styled.h3`
  font-size: 32px;
  margin-bottom: 30px;
  color: var(--dark-text);
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  width: 100%;
  margin-bottom: 30px;
`;

const OptionButton = styled.button`
  background: ${(props) =>
    props.selected ? "var(--primary-blue)" : "transparent"};
  border: 1px solid
    ${(props) =>
      props.selected ? "var(--primary-blue)" : "var(--border-color)"};
  border-radius: 6px;
  padding: 20px;
  color: ${(props) => (props.selected ? "white" : "var(--dark-text)")};
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${(props) =>
    props.selected ? "0 2px 8px var(--box-shadow)" : "none"};

  &:hover {
    background-color: ${(props) =>
      props.selected ? "var(--secondary-blue)" : "rgba(0, 0, 0, 0.03)"};
  }
`;

const NavigationButtons = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 30px;
`;

const NavButton = styled.button`
  &.cta-button {
    padding: 12px 30px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const RecommendationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  width: 100%;
  margin-top: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const RecommendedCard = styled.div`
  &.card-container {
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 20px;
  object-fit: cover;
`;

const CardName = styled.h4`
  font-size: 24px;
  margin-bottom: 10px;
  color: var(--dark-text);
`;

const BenefitsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
  li {
    font-size: 16px;
    margin-bottom: 8px;
    opacity: 0.9;
    color: var(--light-text);
    &:before {
      content: "• ";
      color: var(--primary-blue);
      font-weight: bold;
      display: inline-block;
      width: 1em;
      margin-left: -1em;
    }
  }
`;

const WhyRecommended = styled.div`
  font-size: 14px;
  margin-bottom: 15px;
  color: var(--dark-text);
  opacity: 0.9;
`;

const ApplyButton = styled.a`
  &.cta-button {
    text-decoration: none;
    width: 100%;
    text-align: center;
    margin-top: auto;
  }
`;

const CreditCardRecommendations = () => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    spendingHabit: null,
    incomeLevel: null,
    cibilScore: null,
    desiredBenefit: null,
  });
  const [recommendations, setRecommendations] = useState([]);

  const sampleCreditCards = [
    {
      id: "axis_ace",
      name: "Axis Bank ACE Credit Card",
      benefits: [
        "5% cashback on bill payments & DTH recharges",
        "4% cashback on Swiggy, Zomato, Ola",
        "2% cashback on all other spends",
      ],
      idealFor: ["everyday_spending", "cashback", "dining"],
      income: "medium",
      cibil: "good",
      imageUrl:
        "https://www.axisbank.com/images/default-source/revamp_new/cards/credit-card/ace-credit-card.png",
      applyLink:
        "https://www.axisbank.com/retail/cards/credit-card/ace-credit-card",
    },
    {
      id: "hdfc_regalia",
      name: "HDFC Regalia Credit Card",
      benefits: [
        "Complimentary airport lounge access",
        "Earn 4 reward points per ₹150",
        "Low foreign currency markup",
      ],
      idealFor: ["travel", "high_spender"],
      income: "high",
      cibil: "excellent",
      imageUrl:
        "https://www.hdfcbank.com/content/dam/hdfcbank/Credit_card/Regalia/regalia_credit_card_484x252.jpg",
      applyLink:
        "https://www.hdfcbank.com/personal/pay/cards/credit-cards/regalia",
    },
    {
      id: "sbi_prime",
      name: "SBI Card PRIME",
      benefits: [
        "Complimentary Club Vistara & Trident Privilege membership",
        "Welcome gift worth ₹3,000",
        "Airport lounge access",
      ],
      idealFor: ["travel", "everyday_spending"],
      income: "high",
      cibil: "good",
      imageUrl:
        "https://www.sbicard.com/sbi-card-en/assets/media/images/prime-card.png",
      applyLink:
        "https://www.sbicard.com/en/personal/credit-cards/rewards/sbi-card-prime.page",
    },
    {
      id: "amazon_icici",
      name: "Amazon Pay ICICI Credit Card",
      benefits: [
        "5% cashback for Prime members on Amazon",
        "3% cashback on Amazon (non-Prime)",
        "1% cashback on all other spends",
      ],
      idealFor: ["cashback", "everyday_spending"],
      income: "medium",
      cibil: "good",
      imageUrl:
        "https://www.icicibank.com/content/dam/icicibank/india/managed-assets/images/cards/amazon-pay-credit-card.jpg",
      applyLink:
        "https://www.icicibank.com/Personal-Banking/cards/Consumer-Cards/Credit-Card/amazon-pay-credit-card/index.page",
    },
    {
      id: "icici_sapphiro",
      name: "ICICI Sapphiro Credit Card",
      benefits: [
        "Complimentary domestic & international lounge access",
        "Golf privileges",
        "Travel & lifestyle rewards",
      ],
      idealFor: ["travel", "luxury", "high_spender"],
      income: "very_high",
      cibil: "excellent",
      imageUrl:
        "https://www.icicibank.com/content/dam/icicibank/india/managed-assets/images/cards/sapphiro-credit-card.jpg",
      applyLink:
        "https://www.icicibank.com/Personal-Banking/cards/Consumer-Cards/Credit-Card/icici-bank-sapphiro-credit-card/index.page",
    },
    {
      id: "hdfc_moneyback",
      name: "HDFC MoneyBack+ Credit Card",
      benefits: [
        "5% cashback on Amazon, Flipkart, BigBasket",
        "2% cashback on all online spends",
        "1% cashback on other spends",
      ],
      idealFor: ["cashback", "everyday_spending"],
      income: "medium",
      cibil: "average",
      imageUrl:
        "https://www.hdfcbank.com/content/dam/hdfcbank/Credit_card/Moneyback_Plus/moneyback-plus-card-484x252.png",
      applyLink:
        "https://www.hdfcbank.com/personal/pay/cards/credit-cards/moneyback-plus",
    },
    {
      id: "sbi_elite",
      name: "SBI Card ELITE",
      benefits: [
        "Free Club Vistara membership",
        "Complimentary Trident Privilege membership",
        "6 airport lounge visits per year",
      ],
      idealFor: ["travel", "luxury"],
      income: "very_high",
      cibil: "excellent",
      imageUrl:
        "https://www.sbicard.com/sbi-card-en/assets/media/images/elite-card.png",
      applyLink:
        "https://www.sbicard.com/en/personal/credit-cards/rewards/sbi-card-elite.page",
    },
  ];

  const questions = [
    {
      id: "spendingHabit",
      text: "What are your primary spending habits?",
      options: [
        { label: "Travel", value: "travel" },
        { label: "Dining & Entertainment", value: "dining" },
        { label: "Everyday Purchases", value: "everyday_spending" },
        { label: "Fuel & Commuting", value: "commuter" },
      ],
    },
    {
      id: "incomeLevel",
      text: "What is your approximate annual income level?",
      options: [
        { label: "Below ₹3 Lakhs", value: "low" },
        { label: "₹3 - ₹7 Lakhs", value: "medium" },
        { label: "₹7 - ₹15 Lakhs", value: "high" },
        { label: "Above ₹15 Lakhs", value: "very_high" },
      ],
    },
    {
      id: "cibilScore",
      text: "What is your current CIBIL Score range?",
      options: [
        { label: "Below 600 (Poor)", value: "poor" },
        { label: "600 - 700 (Average)", value: "average" },
        { label: "700 - 750 (Good)", value: "good" },
        { label: "Above 750 (Excellent)", value: "excellent" },
        { label: "New to Credit", value: "new_to_credit" },
      ],
    },
    {
      id: "desiredBenefit",
      text: "What kind of benefit do you value most?",
      options: [
        { label: "Cashback", value: "cashback" },
        { label: "Travel Rewards", value: "travel" },
        { label: "Points & Miles", value: "points" },
        { label: "Building Credit", value: "build_credit" },
      ],
    },
  ];

  const handleAnswer = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const goToNextStep = () => {
    if (step < questions.length) {
      setStep((prev) => prev + 1);
    } else {
      generateRecommendations();
    }
  };

  const goToPreviousStep = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  // ✅ New weighted scoring system
  const generateRecommendations = () => {
    const weights = {
      cibil: 0.4,
      income: 0.3,
      spending: 0.2,
      benefit: 0.1,
    };

    const scored = sampleCreditCards.map((card) => {
      let score = 0;
      let reasons = [];

      // Spending Habit
      if (
        answers.spendingHabit &&
        card.idealFor.includes(answers.spendingHabit)
      ) {
        score += weights.spending;
        reasons.push("Matches your spending habit");
      }

      // Income match
      if (
        (answers.incomeLevel === "low" && card.income === "low") ||
        (answers.incomeLevel === "medium" &&
          ["low", "medium"].includes(card.income)) ||
        (answers.incomeLevel === "high" &&
          ["medium", "high"].includes(card.income)) ||
        (answers.incomeLevel === "very_high" &&
          ["high", "very_high"].includes(card.income))
      ) {
        score += weights.income;
        reasons.push("Suitable for your income level");
      }

      // CIBIL match
      if (
        (answers.cibilScore === "poor" && card.cibil === "poor") ||
        (answers.cibilScore === "average" &&
          ["average", "good"].includes(card.cibil)) ||
        (answers.cibilScore === "good" &&
          ["good", "excellent"].includes(card.cibil)) ||
        (answers.cibilScore === "excellent" && card.cibil === "excellent") ||
        (answers.cibilScore === "new_to_credit" && card.cibil === "poor")
      ) {
        score += weights.cibil;
        reasons.push("Good match for your CIBIL score");
      }

      // Benefit match
      if (answers.desiredBenefit) {
        if (
          answers.desiredBenefit === "cashback" &&
          card.benefits.some((b) => b.toLowerCase().includes("cashback"))
        ) {
          score += weights.benefit;
          reasons.push("Offers strong cashback benefits");
        } else if (
          answers.desiredBenefit === "travel" &&
          card.benefits.some((b) => b.toLowerCase().includes("travel"))
        ) {
          score += weights.benefit;
          reasons.push("Great for travel rewards");
        } else if (
          answers.desiredBenefit === "points" &&
          card.benefits.some((b) => b.toLowerCase().includes("point"))
        ) {
          score += weights.benefit;
          reasons.push("Earns good reward points");
        } else if (
          answers.desiredBenefit === "build_credit" &&
          card.cibil === "poor"
        ) {
          score += weights.benefit;
          reasons.push("Helps in building credit history");
        }
      }

      return { ...card, score, reasons };
    });

    // Sort by score & pick top 3
    const topCards = scored
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .filter((card) => card.score > 0);

    setRecommendations(topCards.length > 0 ? topCards : [scored[0]]);
  };

  const currentQuestion = questions[step - 1];
  const isCurrentStepAnswered = answers[currentQuestion?.id] !== null;

  return (
    <RecommendationsContainer>
      <PageTitle>Credit Card Recommender</PageTitle>

      {recommendations.length === 0 ? (
        <QuestionCard className="card-container">
          <QuestionText>{currentQuestion.text}</QuestionText>
          <OptionsGrid>
            {currentQuestion.options.map((option) => (
              <OptionButton
                key={option.value}
                selected={answers[currentQuestion.id] === option.value}
                onClick={() => handleAnswer(currentQuestion.id, option.value)}
              >
                {option.label}
              </OptionButton>
            ))}
          </OptionsGrid>
          <NavigationButtons>
            <NavButton
              className="cta-button"
              onClick={goToPreviousStep}
              disabled={step === 1}
            >
              Previous
            </NavButton>
            <NavButton
              className="cta-button"
              onClick={goToNextStep}
              disabled={!isCurrentStepAnswered}
            >
              {step < questions.length ? "Next" : "Get Recommendations"}
            </NavButton>
          </NavigationButtons>
        </QuestionCard>
      ) : (
        <>
          <PageTitle>Your Recommended Cards</PageTitle>
          <RecommendationsGrid>
            {recommendations.map((card) => (
              <RecommendedCard key={card.id} className="card-container">
                <CardImage src={card.imageUrl} alt={card.name} />
                <CardName>{card.name}</CardName>
                <WhyRecommended>
                  {card.reasons.map((r, idx) => (
                    <div key={idx}>✔ {r}</div>
                  ))}
                </WhyRecommended>
                <BenefitsList>
                  {card.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </BenefitsList>
                <ApplyButton
                  className="cta-button"
                  href={card.applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Apply Now
                </ApplyButton>
              </RecommendedCard>
            ))}
          </RecommendationsGrid>
          <NavButton
            className="cta-button"
            onClick={() => {
              setRecommendations([]);
              setStep(1);
              setAnswers({});
            }}
          >
            Start Over
          </NavButton>
        </>
      )}
    </RecommendationsContainer>
  );
};

export default CreditCardRecommendations;
