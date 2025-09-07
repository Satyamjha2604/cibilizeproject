import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const FormWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  background-color: var(--card-background);
  border-radius: 12px;
  box-shadow: 0 4px 12px var(--box-shadow);
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease;
  font-family: "Montserrat", sans-serif;

  // Reusing color variables from the global theme
  --primary-blue: #007bff;
  --secondary-blue: #0056b3;
  --dark-text: #2c3e50;
  --light-text: #5c6c7c;
  --soft-white: #f8f9fa;
  --card-background: #ffffff;
  --border-color: #e0e6ed;
  --box-shadow: rgba(44, 62, 80, 0.1);

  &:hover {
    transform: translateY(-5px);
  }
`;

const FormTitle = styled.h3`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 20px;
  color: var(--dark-text);

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
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

const LoginForm = ({ onLoginSuccess, onSwitchToSignup }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { username, password }
      );

      localStorage.setItem("token", response.data.token);
      // The onLoginSuccess function is now a prop and will be called from here
      onLoginSuccess();
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Network error. Please try again.");
      }
      console.error("Login Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormWrapper>
      <FormTitle>Welcome Back!</FormTitle>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Input
            type="text"
            placeholder=" "
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Label>Username</Label>
        </InputGroup>
        <InputGroup>
          <Input
            type="password"
            placeholder=" "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Label>Password</Label>
        </InputGroup>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        <SubmitButton type="submit" disabled={loading}>
          {loading ? "Logging In..." : "Log In"}
        </SubmitButton>
        <div style={{ textAlign: "center", marginTop: "15px" }}>
          Don't have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToSignup}
            style={{
              background: "none",
              border: "none",
              color: "var(--primary-blue)",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Sign Up
          </button>
        </div>
      </Form>
    </FormWrapper>
  );
};

export default LoginForm;
