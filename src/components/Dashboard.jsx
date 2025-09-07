import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";

const pulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0px var(--primary-blue);
  }
  100% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(0, 123, 255, 0);
  }
`;

const DashboardContainer = styled.div`
  padding: 50px 30px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: flex-start;
  gap: 30px;
  max-width: 1400px;
  margin: 0 auto;
  font-family: "Montserrat", sans-serif;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 20px;
  }
`;

const Card = styled.div`
  background-color: var(--card-background);
  border-radius: 16px;
  box-shadow: 0 8px 20px var(--box-shadow);
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 24px rgba(44, 62, 80, 0.15);
  }

  h2 {
    font-size: 28px;
    font-weight: 700;
    color: var(--dark-text);
    margin-bottom: 10px;
  }

  p {
    color: var(--light-text);
    font-size: 16px;
    margin-bottom: 20px;
  }
`;

const CibilScoreCard = styled(Card)`
  grid-column: 1 / 2;
  min-height: 400px;
  justify-content: center;
`;

const ScoreVisualizer = styled.div`
  width: 280px;
  height: 280px;
  position: relative;

  .score-value {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    span {
      font-size: 64px;
      font-weight: 800;
      color: var(--primary-blue);
    }

    p {
      font-size: 18px;
      font-weight: 600;
      margin-top: 5px;
    }
  }
`;

const SimulatorCard = styled(Card)`
  grid-column: 2 / 3;
`;

const SimulatorForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  margin-top: 20px;
`;

const InputGroup = styled.div`
  width: 100%;
  text-align: left;
`;

const Label = styled.label`
  font-weight: 500;
  font-size: 16px;
  color: var(--dark-text);
  margin-bottom: 8px;
  display: block;
`;

const StyledInput = styled.input`
  padding: 12px;
  border: 1px solid var(--border-color);
  background: var(--soft-white);
  border-radius: 8px;
  color: var(--dark-text);
  font-size: 16px;
  width: 100%;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: var(--primary-blue);
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2);
  }
`;

const CtaButton = styled.button`
  background: linear-gradient(
    90deg,
    var(--primary-blue),
    var(--secondary-blue)
  );
  color: white;
  border: none;
  border-radius: 8px;
  padding: 14px 28px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.25);
  transition: all 0.3s ease;
  margin-top: 15px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 123, 255, 0.35);
  }

  &:disabled {
    background: var(--border-color);
    color: var(--light-text);
    cursor: not-allowed;
    box-shadow: none;
  }
`;

const ResultContainer = styled.div`
  margin-top: 25px;
  padding: 20px;
  background-color: var(--soft-white);
  border-radius: 8px;
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  text-align: center;
  width: 100%;
`;

const ResultMessage = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: var(--dark-text);
  margin: 0;
`;

const ResultScore = styled.span`
  font-size: 40px;
  font-weight: 700;
  color: var(--primary-blue);
  margin-top: 10px;
  display: block;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid var(--border-color);
  border-top: 4px solid var(--primary-blue);
  border-radius: 50%;
  animation: ${pulse} 1s infinite;
  margin: 0 auto 15px;
`;

const HistoryCard = styled(Card)`
  grid-column: 1 / -1;
  margin-top: 20px;
`;

const scoreColors = {
  Excellent: "#007bff",
  Good: "#28a745",
  Fair: "#ffc107",
  Poor: "#dc3545",
  "N/A": "#6c757d",
};

const Dashboard = () => {
  const [formData, setFormData] = useState({
    income: "",
    loanAmount: "",
    utilization: "",
    missedEMIs: "",
    age: "",
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const [scoreHistory] = useState([
    { name: "Jan", score: 720 },
    { name: "Feb", score: 735 },
    { name: "Mar", score: 740 },
    { name: "Apr", score: 710 },
    { name: "May", score: 755 },
    { name: "Jun", score: 780 },
  ]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const token = localStorage.getItem("token");
    if (!token) {
      setResult({
        score: "N/A",
        reason: "Please log in to use the simulator.",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/openai/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error with backend:", error);
      setResult({
        score: "N/A",
        reason: "Failed to get prediction. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const getScoreCategory = (score) => {
    if (score >= 851) return "Excellent";
    if (score >= 701) return "Good";
    if (score >= 551) return "Fair";
    if (score >= 300) return "Poor";
    return "N/A";
  };

  const getScoreColor = (score) => {
    const category = getScoreCategory(score);
    return scoreColors[category] || scoreColors["N/A"];
  };

  const scoreData = [
    {
      name: "Score",
      value: result && result.score !== "N/A" ? (result.score / 900) * 100 : 0,
      fill: result ? getScoreColor(result.score) : "#6c757d",
    },
  ];

  return (
    <DashboardContainer>
      {/* CIBIL SCORE VISUALIZER */}
      <CibilScoreCard>
        <h2>Your Predicted Credit Score</h2>
        <ScoreVisualizer>
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              innerRadius="70%"
              outerRadius="90%"
              data={scoreData}
              startAngle={180}
              endAngle={0}
            >
              <PolarAngleAxis
                type="number"
                domain={[0, 100]}
                angleAxisId={0}
                tick={false}
              />
              <RadialBar
                background={{ fill: "#e0e6ed" }}
                dataKey="value"
                cornerRadius={100}
              />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="score-value">
            {loading ? (
              <LoadingSpinner />
            ) : result ? (
              <>
                <span>{result.score}</span>
                <p style={{ color: getScoreColor(result.score) }}>
                  {getScoreCategory(result.score)}
                </p>
              </>
            ) : (
              <p style={{ fontSize: "18px", color: "var(--light-text)" }}>
                Enter your details
              </p>
            )}
          </div>
        </ScoreVisualizer>
      </CibilScoreCard>

      {/* SIMULATOR */}
      <SimulatorCard>
        <h2>Credit Score Simulator</h2>
        <p>See how your financial actions can affect your score.</p>
        <SimulatorForm onSubmit={handleSubmit}>
          <InputGroup>
            <Label htmlFor="income">Monthly Income (₹)</Label>
            <StyledInput
              type="number"
              id="income"
              name="income"
              value={formData.income}
              onChange={handleChange}
              required
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="loanAmount">Loan Amount (₹)</Label>
            <StyledInput
              type="number"
              id="loanAmount"
              name="loanAmount"
              value={formData.loanAmount}
              onChange={handleChange}
              required
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="utilization">Credit Utilization (%)</Label>
            <StyledInput
              type="number"
              id="utilization"
              name="utilization"
              value={formData.utilization}
              onChange={handleChange}
              required
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="missedEMIs">Missed EMIs</Label>
            <StyledInput
              type="number"
              id="missedEMIs"
              name="missedEMIs"
              value={formData.missedEMIs}
              onChange={handleChange}
              required
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="age">Age</Label>
            <StyledInput
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </InputGroup>
          <CtaButton type="submit" disabled={loading}>
            {loading ? "Predicting..." : "Get Predicted Score"}
          </CtaButton>
        </SimulatorForm>

        {result && (
          <ResultContainer>
            <ResultMessage>
              {result.reason
                ? `Reason: ${result.reason}`
                : `Your score is ${getScoreCategory(result.score)}`}
            </ResultMessage>
            {result.score !== "N/A" && (
              <ResultScore>{result.score}</ResultScore>
            )}
          </ResultContainer>
        )}
      </SimulatorCard>

      {/* HISTORY */}
      <HistoryCard>
        <h2>Credit Score History</h2>
        <p>Track your credit score evolution over time.</p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={scoreHistory}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
            <XAxis dataKey="name" stroke="var(--light-text)" />
            <YAxis stroke="var(--light-text)" />
            <Tooltip />
            <Bar dataKey="score" fill="var(--primary-blue)" />
          </BarChart>
        </ResponsiveContainer>
      </HistoryCard>
    </DashboardContainer>
  );
};

export default Dashboard;
