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

// ---------- Styled Components ----------
const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0px var(--primary-blue); }
  100% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(0, 123, 255, 0); }
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
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(44, 62, 80, 0.15);
  }

  h2 {
    font-size: 26px;
    font-weight: 700;
    color: var(--dark-text);
    margin-bottom: 8px;
  }
  p {
    color: var(--light-text);
    font-size: 15px;
    margin-bottom: 18px;
  }
`;

const CibilScoreCard = styled(Card)`
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

// ---------- Dashboard Component ----------
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
  const [scoreHistory, setScoreHistory] = useState([
    { name: "May", score: 710 },
    { name: "Jun", score: 740 },
    { name: "Jul", score: 770 },
    { name: "Aug", score: 730 },
    { name: "Sep", score: 780 },
    { name: "Oct", score: 0 },
  ]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getScoreCategory = (score) => {
    if (typeof score !== "number") return "N/A";
    if (score >= 800) return "Excellent";
    if (score >= 700) return "Good";
    if (score >= 600) return "Fair";
    return "Poor";
  };

  const getScoreColor = (score) => {
    if (typeof score !== "number") return scoreColors["N/A"];
    return scoreColors[getScoreCategory(score)];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://localhost:5000/api/gemini/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.reason || "Backend error");

      setResult({
        score: typeof data.score === "number" ? data.score : null,
        reason: data.reason || "",
      });

      if (typeof data.score === "number") {
        setScoreHistory((prev) => {
          const newEntry = {
            name: new Date().toLocaleString("default", { month: "short" }),
            score: data.score,
          };
          return [...prev.slice(-5), newEntry];
        });
      }
    } catch (err) {
      console.error("Error:", err);
      setResult({
        score: null,
        reason: "Failed to get prediction. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const scoreData = [
    {
      name: "Score",
      value: result?.score || 300, // default to lower bound
      fill: result ? getScoreColor(result.score) : "#6c757d",
    },
  ];

  return (
    <DashboardContainer>
      {/* CREDIT SCORE VISUALIZER */}
      <CibilScoreCard>
        <h2>Your Predicted Credit Score</h2>
        <ScoreVisualizer>
          <ResponsiveContainer width={280} height={280}>
            <RadialBarChart
              innerRadius="70%"
              outerRadius="90%"
              data={scoreData}
              startAngle={180}
              endAngle={0}
            >
              <PolarAngleAxis
                type="number"
                domain={[300, 900]}
                tick={false}
                angleAxisId={0}
              />
              <RadialBar
                background={{ fill: "#e0e6ed" }}
                dataKey="value"
                cornerRadius={100}
              />
            </RadialBarChart>
            <div className="score-value">
              {loading ? (
                <LoadingSpinner />
              ) : result ? (
                <>
                  <span>
                    {typeof result.score === "number" ? result.score : "N/A"}
                  </span>
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
          </ResponsiveContainer>
        </ScoreVisualizer>
      </CibilScoreCard>

      {/* SIMULATOR */}
      <SimulatorCard>
        <h2>Credit Score Simulator</h2>
        <p>See how your financial actions can affect your score.</p>
        <SimulatorForm onSubmit={handleSubmit}>
          {["income", "loanAmount", "utilization", "missedEMIs", "age"].map(
            (id) => (
              <InputGroup key={id}>
                <Label htmlFor={id}>
                  {id === "income"
                    ? "Monthly Income (₹)"
                    : id === "loanAmount"
                    ? "Loan Amount (₹)"
                    : id === "utilization"
                    ? "Credit Utilization (%)"
                    : id === "missedEMIs"
                    ? "Missed EMIs"
                    : "Age"}
                </Label>
                <StyledInput
                  type="number"
                  id={id}
                  name={id}
                  value={formData[id]}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
            )
          )}
          <CtaButton type="submit" disabled={loading}>
            {loading ? "Predicting..." : "Get Predicted Score"}
          </CtaButton>
        </SimulatorForm>

        {result && (
          <ResultContainer>
            <ResultMessage>
              {result.reason
                ? `Reason: ${result.reason}`
                : "No detailed explanation available."}
            </ResultMessage>
            {typeof result.score === "number" && (
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
            <YAxis stroke="var(--light-text)" domain={[300, 900]} />
            <Tooltip />
            <Bar dataKey="score" fill="var(--primary-blue)" />
          </BarChart>
        </ResponsiveContainer>
      </HistoryCard>
    </DashboardContainer>
  );
};

export default Dashboard;
