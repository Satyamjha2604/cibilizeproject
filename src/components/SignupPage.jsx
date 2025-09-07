import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const SignupPageContainer = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  min-height: 80vh;
  font-family: "Montserrat", sans-serif;

  --primary-blue: #007bff;
  --secondary-blue: #0056b3;
  --dark-text: #2c3e50;
  --light-text: #5c6c7c;
  --soft-white: #f8f9fa;
  --card-background: #ffffff;
  --border-color: #e0e6ed;
  --box-shadow: rgba(44, 62, 80, 0.1);

  @media (max-width: 768px) {
    padding: 30px;
  }
`;

const FormCard = styled.div`
  background-color: var(--card-background);
  border-radius: 12px;
  box-shadow: 0 4px 12px var(--box-shadow);
  width: 100%;
  max-width: 600px;
  padding: 50px;
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const PageTitle = styled.h2`
  font-size: 44px;
  font-weight: 700;
  margin-bottom: 20px;
  color: var(--dark-text);

  @media (max-width: 480px) {
    font-size: 32px;
  }
`;

const StepForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin-top: 30px;
  width: 100%;
`;

const InputGroup = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  background: var(--soft-white);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  color: var(--dark-text);
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: var(--primary-blue);
  }
`;

const Label = styled.label`
  position: absolute;
  left: 15px;
  top: 15px;
  color: var(--light-text);
  font-size: 16px;
  pointer-events: none;
  transition: all 0.3s ease;
  background-color: var(--card-background);
  padding: 0 5px;

  ${Input}:focus + &,
  ${Input}:not(:placeholder-shown) + & {
    top: -10px;
    left: 10px;
    font-size: 12px;
    color: var(--primary-blue);
  }
`;

const StepIndicatorContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
  width: 100%;
`;

const StepIndicator = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${(props) =>
    props.$active ? "var(--primary-blue)" : "var(--border-color)"};
  transition: background 0.3s ease;
`;

const SubmitButton = styled.button`
  background-color: var(--primary-blue);
  border: none;
  border-radius: 6px;
  padding: 12px 24px;
  color: var(--soft-white);
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 8px var(--box-shadow);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  margin-top: 25px;
  width: 100%;

  &:hover {
    background-color: var(--secondary-blue);
    box-shadow: 0 6px 12px var(--box-shadow);
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;

  input[type="checkbox"] {
    width: 20px;
    height: 20px;
    cursor: pointer;
    background: var(--soft-white);
    border: 1px solid var(--border-color);
    border-radius: 5px;
    appearance: none;
    position: relative;
    transition: background 0.3s ease, border-color 0.3s ease;

    &:checked {
      background: var(--primary-blue);
      border-color: var(--primary-blue);
    }

    &:checked::after {
      content: "✓";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: var(--soft-white);
      font-size: 16px;
    }
  }
`;

const CheckboxLabel = styled.label`
  font-size: 14px;
  opacity: 0.8;
  a {
    color: var(--primary-blue);
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const SignupPage = ({ onSignupSuccess, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    termsAccepted: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      setError("You must agree to the Terms and Conditions.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          username: formData.username,
          password: formData.password,
        }
      );

      console.log(response.data.message);
      // The onSignupSuccess function is now a prop and will be called from here
      onSignupSuccess();
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Network error. Please try again.");
      }
      console.error("Signup Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignupPageContainer>
      <PageTitle>Create Your Cibilize Account</PageTitle>
      <FormCard>
        <StepIndicatorContainer>
          <StepIndicator $active={true} />
        </StepIndicatorContainer>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <StepForm onSubmit={handleFinalSubmit}>
          <h3>Create Account</h3>
          <InputGroup>
            <Input
              type="text"
              name="username"
              placeholder=" "
              value={formData.username}
              onChange={handleChange}
              required
            />
            <Label htmlFor="username">Username</Label>
          </InputGroup>
          <InputGroup>
            <Input
              type="password"
              name="password"
              placeholder=" "
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Label htmlFor="password">Password</Label>
          </InputGroup>
          <CheckboxGroup>
            <Input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
            />
            <CheckboxLabel>
              I agree to the <a href="#">Terms and Conditions</a>
            </CheckboxLabel>
          </CheckboxGroup>
          <SubmitButton type="submit" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </SubmitButton>
          <div style={{ textAlign: "center", marginTop: "15px" }}>
            Already have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToLogin}
              style={{
                background: "none",
                border: "none",
                color: "var(--primary-blue)",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Log In
            </button>
          </div>
        </StepForm>
      </FormCard>
    </SignupPageContainer>
  );
};

export default SignupPage;
