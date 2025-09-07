import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";

// ------------------- Global Styles -------------------
const GlobalStyles = createGlobalStyle`
  :root {
    --background-gradient: linear-gradient(135deg, #f5f6fa 60%, #e1e6f9 100%);
    --primary-blue: #007bff;
    --secondary-blue: #0056b3;
    --border-color: #dcdde1;
    --dark-text: #2f3640;
    --light-text: #718093;
    --soft-white: #ffffff;
    --box-shadow: rgba(0, 0, 0, 0.08);
  }
  body {
    margin: 0;
    font-family: "Montserrat", sans-serif;
    background: var(--background-gradient);
  }
`;

// ------------------- Styled Components -------------------
const ToolsContainer = styled.div`
  padding: 50px;
  max-width: 980px;
  margin: 0 auto;
  border-radius: 18px;
  background: var(--soft-white);
  box-shadow: 0 8px 32px var(--box-shadow);
`;

const ToolTitle = styled.h2`
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 24px;
  text-align: center;
  color: var(--primary-blue);
  letter-spacing: 1px;
`;

const InfoBox = styled.div`
  background: linear-gradient(90deg, #f5f6fa 70%, #cde4ff 100%);
  color: var(--light-text);
  padding: 18px 26px;
  margin-bottom: 22px;
  border-radius: 8px;
  font-size: 17px;
  box-shadow: 0 1px 8px var(--box-shadow);
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 30px;
`;

const TabButton = styled.button`
  background: ${(props) =>
    props.active ? "var(--primary-blue)" : "var(--soft-white)"};
  border: 2px solid
    ${(props) => (props.active ? "var(--primary-blue)" : "var(--border-color)")};
  border-radius: 7px;
  padding: 12px 18px;
  font-size: 17px;
  font-weight: 600;
  color: ${(props) => (props.active ? "#fff" : "var(--dark-text)")};
  box-shadow: ${(props) =>
    props.active ? "0 2px 10px var(--box-shadow)" : "none"};
  cursor: pointer;
  transition: all 0.21s ease;
  &:hover {
    background-color: ${(props) =>
      props.active ? "var(--secondary-blue)" : "#eef1fa"};
    color: var(--primary-blue);
  }
`;

const CalculatorCard = styled.div`
  padding: 32px 26px;
  background: var(--soft-white);
  border-radius: 12px;
  box-shadow: 0 2px 9px var(--box-shadow);
  transition: box-shadow 0.18s ease;
`;

const CardHeading = styled.h3`
  font-size: 30px;
  margin: 0 0 18px 0;
  color: var(--dark-text);
`;

const CalculatorBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 17px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 17px;
  font-weight: 500;
  color: var(--dark-text);
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: 7px;
  font-size: 17px;
  outline: none;
  &:focus {
    border-color: var(--primary-blue);
    background: #eaf4ff;
  }
`;

const Button = styled.button`
  padding: 13px 23px;
  border: none;
  border-radius: 7px;
  background: var(--primary-blue);
  color: white;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.24s ease;
  margin-top: 4px;
  &:hover {
    background: var(--secondary-blue);
  }
`;

const Result = styled.div`
  margin-top: 24px;
  padding: 18px 15px;
  border-radius: 7px;
  background: #f7f9fc;
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 8px var(--box-shadow);
  font-size: 19px;
  font-weight: 600;
  color: var(--dark-text);
`;

const ResultValue = styled.span`
  font-size: 22px;
  font-weight: 700;
  color: var(--primary-blue);
`;

// ------- Formula & Description Lookup -------
const calculatorFormulas = {
  EMI: {
    formula: "EMI = [P × r × (1 + r)^n ] / [ (1 + r)^n - 1 ]",
    latex: "\\text{EMI} = \\frac{P \\cdot r \\cdot (1 + r)^n}{(1 + r)^n - 1}",
  },
  SIP: {
    formula: "FV = PMT × [ (1 + r)^n – 1 ] / r × (1 + r)",
    latex: "FV = PMT \\cdot \\frac{(1 + r)^n - 1}{r} \\cdot (1 + r)",
  },
  Lumpsum: {
    formula: "FV = P × (1 + r)^n",
    latex: "FV = P \\cdot (1 + r)^n",
  },
  Debt: {
    formula:
      "Savings = Income – Expense; Savings Rate = (Savings / Income) × 100",
    latex:
      "\\text{Savings} = \\text{Income} - \\text{Expense} \\\\ \\text{Savings Rate} = \\frac{\\text{Savings}}{\\text{Income}} \\times 100",
  },
  Tax: {
    formula: "Income tax based on Indian slabs (0%, 5%, 20%, 30%)",
    latex: "",
  },
  Retirement: {
    formula: "Same as SIP FV formula; Compare with target corpus",
    latex: "",
  },
  Emergency: {
    formula: "Emergency Fund = Monthly Expense × 6",
    latex: "\\text{Emergency Fund} = \\text{Monthly Expense} \\times 6",
  },
  "Net Worth": {
    formula: "Net Worth = Assets – Liabilities",
    latex: "\\text{Net Worth} = \\text{Assets} - \\text{Liabilities}",
  },
  "CC Payoff": {
    formula:
      "Months = log(1 + Balance / (Monthly × (1 – APR/12)) ) / log(1 + APR/12)",
    latex: "",
  },
  "FD/RD": {
    formula: "RD: FV = D × [ (1 + r)^n – 1 ] / r; FD: FV = P × (1 + r)^n",
    latex: "",
  },
};

const calculatorDescriptions = {
  EMI: "Calculates the fixed monthly payment on a loan (like home or car) for the given principal, interest, and tenure.",
  SIP: "Projects the future value of your regular monthly investments in a SIP with compounding returns.",
  Lumpsum:
    "Finds the maturity value of a single lump sum investment compounded at the given rate for the chosen period.",
  Debt: "Shows annual savings and savings rate for budgeting and spending analysis.",
  Tax: "Displays estimated personal income tax according to current basic slabs in India.",
  Retirement:
    "Helps plan your retirement by estimating the future corpus based on your regular investments and compares with your required target.",
  Emergency:
    "Calculates the recommended size of your emergency fund (usually six months of living expenses).",
  "Net Worth":
    "Adds up your assets and subtracts liabilities to show your current total net worth.",
  "CC Payoff":
    "Estimates monthly payments and time needed to pay off your credit card balance based on interest rates.",
  "FD/RD":
    "Computes the maturity value for Fixed or Recurring Deposits over the specified period.",
};

// ------------------- Calculator Tabs -------------------
const calculators = [
  "EMI",
  "SIP",
  "Lumpsum",
  "Debt",
  "Tax",
  "Retirement",
  "Emergency",
  "Net Worth",
  "CC Payoff",
  "FD/RD",
];

// ------------------- Main Component -------------------
const FinancialTools = () => {
  const [activeTab, setActiveTab] = useState("EMI");
  const [inputs, setInputs] = useState({
    principal: 500000,
    rate: 8.5,
    tenure: 5,
    monthly: 5000,
    target: 1000000,
    income: 1000000,
    expense: 500000,
    ccBalance: 50000,
    ccRate: 18,
    fdDeposit: 10000,
  });
  const [results, setResults] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: parseFloat(value) });
  };

  // ------------------- Calculators Logic -------------------
  const calculate = () => {
    let res = {};
    switch (activeTab) {
      case "EMI":
        const P = inputs.principal;
        const r = inputs.rate / 100 / 12;
        const n = inputs.tenure * 12;
        const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        res = { EMI: emi.toFixed(2), "Total Payment": (emi * n).toFixed(2) };
        break;

      case "SIP":
        const pm = inputs.monthly;
        const ir = inputs.rate / 100 / 12;
        const months = inputs.tenure * 12;
        const sipFV = pm * ((Math.pow(1 + ir, months) - 1) / ir) * (1 + ir);
        res = { "Future Value": sipFV.toFixed(2) };
        break;

      case "Lumpsum":
        const LS_P = inputs.principal;
        const LS_r = inputs.rate / 100;
        const LS_t = inputs.tenure;
        const lumpsumFV = LS_P * Math.pow(1 + LS_r, LS_t);
        res = { "Future Value": lumpsumFV.toFixed(2) };
        break;

      case "Debt":
        const income = inputs.income;
        const expense = inputs.expense;
        const savings = income - expense;
        const savingsRate = ((savings / income) * 100).toFixed(2);
        res = { Savings: savings.toFixed(2), "Savings Rate (%)": savingsRate };
        break;

      case "Tax":
        const taxable = inputs.income;
        let tax = 0;
        if (taxable <= 250000) tax = 0;
        else if (taxable <= 500000) tax = (taxable - 250000) * 0.05;
        else if (taxable <= 1000000) tax = 12500 + (taxable - 500000) * 0.2;
        else tax = 112500 + (taxable - 1000000) * 0.3;
        res = { Tax: tax.toFixed(2) };
        break;

      case "Retirement":
        const desiredCorpus = inputs.target;
        const monthlyInvest = inputs.monthly;
        const rate = inputs.rate / 100 / 12;
        const monthsLeft = inputs.tenure * 12;
        const corpusFV =
          monthlyInvest *
          ((Math.pow(1 + rate, monthsLeft) - 1) / rate) *
          (1 + rate);
        res = { "Future Corpus": corpusFV.toFixed(2), Target: desiredCorpus };
        break;

      case "Emergency":
        const monthlyExpense = inputs.expense / 12;
        const emergencyFund = monthlyExpense * 6;
        res = { "Emergency Fund Required": emergencyFund.toFixed(2) };
        break;

      case "Net Worth":
        const assets = inputs.income + inputs.principal + inputs.target;
        const liabilities = inputs.ccBalance + inputs.expense;
        const netWorth = assets - liabilities;
        res = { NetWorth: netWorth.toFixed(2) };
        break;

      case "CC Payoff":
        const balance = inputs.ccBalance;
        const APR = inputs.ccRate / 100;
        const monthlyPayment = balance * 0.05;
        const monthsToPayoff = Math.ceil(
          Math.log(1 + balance / (monthlyPayment * (1 - APR / 12))) /
            Math.log(1 + APR / 12)
        );
        res = {
          "Monthly Payment": monthlyPayment.toFixed(2),
          "Months to Payoff": monthsToPayoff,
        };
        break;

      case "FD/RD":
        const fdP = inputs.fdDeposit;
        const fdR = inputs.rate / 100 / 12;
        const fdT = inputs.tenure * 12;
        const fdValue = fdP * ((Math.pow(1 + fdR, fdT) - 1) / fdR);
        res = { "Maturity Amount": fdValue.toFixed(2) };
        break;

      default:
        res = { info: "Calculation coming soon!" };
    }

    setResults(res);
  };

  // ------------------- Inputs Renderer -------------------
  const renderInputs = () => {
    switch (activeTab) {
      case "EMI":
      case "Lumpsum":
      case "FD/RD":
        return (
          <>
            <InputGroup>
              <Label>Principal / Deposit (₹)</Label>
              <Input
                type="number"
                name={activeTab === "FD/RD" ? "fdDeposit" : "principal"}
                value={
                  activeTab === "FD/RD" ? inputs.fdDeposit : inputs.principal
                }
                onChange={handleInputChange}
              />
            </InputGroup>
            <InputGroup>
              <Label>Rate of Interest / Return (%)</Label>
              <Input
                type="number"
                name="rate"
                value={inputs.rate}
                onChange={handleInputChange}
              />
            </InputGroup>
            <InputGroup>
              <Label>Tenure (Years)</Label>
              <Input
                type="number"
                name="tenure"
                value={inputs.tenure}
                onChange={handleInputChange}
              />
            </InputGroup>
            {activeTab === "FD/RD" && (
              <InputGroup>
                <Label>Monthly Deposit (₹)</Label>
                <Input
                  type="number"
                  name="monthly"
                  value={inputs.monthly}
                  onChange={handleInputChange}
                />
              </InputGroup>
            )}
          </>
        );

      case "SIP":
      case "Retirement":
        return (
          <>
            <InputGroup>
              <Label>Monthly Investment (₹)</Label>
              <Input
                type="number"
                name="monthly"
                value={inputs.monthly}
                onChange={handleInputChange}
              />
            </InputGroup>
            <InputGroup>
              <Label>Expected Rate of Return (%)</Label>
              <Input
                type="number"
                name="rate"
                value={inputs.rate}
                onChange={handleInputChange}
              />
            </InputGroup>
            <InputGroup>
              <Label>Tenure (Years)</Label>
              <Input
                type="number"
                name="tenure"
                value={inputs.tenure}
                onChange={handleInputChange}
              />
            </InputGroup>
            {activeTab === "Retirement" && (
              <InputGroup>
                <Label>Target Corpus (₹)</Label>
                <Input
                  type="number"
                  name="target"
                  value={inputs.target}
                  onChange={handleInputChange}
                />
              </InputGroup>
            )}
          </>
        );

      case "Debt":
      case "Emergency":
        return (
          <>
            <InputGroup>
              <Label>Annual Income (₹)</Label>
              <Input
                type="number"
                name="income"
                value={inputs.income}
                onChange={handleInputChange}
              />
            </InputGroup>
            <InputGroup>
              <Label>Annual Expenses (₹)</Label>
              <Input
                type="number"
                name="expense"
                value={inputs.expense}
                onChange={handleInputChange}
              />
            </InputGroup>
          </>
        );

      case "Tax":
        return (
          <InputGroup>
            <Label>Annual Income (₹)</Label>
            <Input
              type="number"
              name="income"
              value={inputs.income}
              onChange={handleInputChange}
            />
          </InputGroup>
        );

      case "Net Worth":
        return (
          <>
            <InputGroup>
              <Label>Total Assets (₹)</Label>
              <Input
                type="number"
                name="income"
                value={inputs.income}
                onChange={handleInputChange}
              />
            </InputGroup>
            <InputGroup>
              <Label>Savings / Investments (₹)</Label>
              <Input
                type="number"
                name="principal"
                value={inputs.principal}
                onChange={handleInputChange}
              />
            </InputGroup>
            <InputGroup>
              <Label>Liabilities / Debts (₹)</Label>
              <Input
                type="number"
                name="ccBalance"
                value={inputs.ccBalance}
                onChange={handleInputChange}
              />
            </InputGroup>
          </>
        );

      case "CC Payoff":
        return (
          <>
            <InputGroup>
              <Label>Credit Card Balance (₹)</Label>
              <Input
                type="number"
                name="ccBalance"
                value={inputs.ccBalance}
                onChange={handleInputChange}
              />
            </InputGroup>
            <InputGroup>
              <Label>Annual Interest Rate (%)</Label>
              <Input
                type="number"
                name="ccRate"
                value={inputs.ccRate}
                onChange={handleInputChange}
              />
            </InputGroup>
          </>
        );

      default:
        return <p>Inputs coming soon!</p>;
    }
  };

  return (
    <>
      <GlobalStyles />
      <ToolsContainer>
        <ToolTitle>Financial Tools & Calculators</ToolTitle>
        <TabContainer>
          {calculators.map((calc) => (
            <TabButton
              key={calc}
              active={activeTab === calc}
              onClick={() => setActiveTab(calc)}
            >
              {calc}
            </TabButton>
          ))}
        </TabContainer>

        {/* Details for the selected calculator */}
        <InfoBox>
          <strong>{activeTab} Calculator:</strong>{" "}
          {calculatorDescriptions[activeTab]}
        </InfoBox>

        <CalculatorCard>
          <CardHeading>{activeTab} Calculator</CardHeading>
          <CalculatorBody>
            {renderInputs()}
            <Button onClick={calculate}>Calculate</Button>
            {results &&
              Object.entries(results).map(([key, value], index) => (
                <Result key={key + index}>
                  {key}: <ResultValue>{value}</ResultValue>
                  {/* Formula */}
                  {calculatorFormulas[activeTab]?.formula && index === 0 && (
                    <div
                      style={{
                        marginTop: "15px",
                        fontSize: "15px",
                        color: "#007bff",
                        background: "#eef5fc",
                        padding: "7px 12px",
                        borderRadius: "4px",
                        fontFamily: "monospace",
                      }}
                    >
                      <strong>Formula: </strong>
                      {calculatorFormulas[activeTab].formula}
                    </div>
                  )}
                  {/* Description */}
                  {calculatorDescriptions[activeTab] && index === 0 && (
                    <div
                      style={{
                        marginTop: "8px",
                        fontSize: "14px",
                        color: "var(--light-text)",
                        padding: "7px 12px",
                        borderRadius: "4px",
                      }}
                    >
                      {calculatorDescriptions[activeTab]}
                    </div>
                  )}
                </Result>
              ))}
          </CalculatorBody>
        </CalculatorCard>
      </ToolsContainer>
    </>
  );
};

export default FinancialTools;
