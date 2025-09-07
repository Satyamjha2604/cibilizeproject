import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: ${(props) => (props.show ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  width: 90%;
  max-width: 450px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  position: relative;
  animation: slide-in 0.3s ease-out;

  @keyframes slide-in {
    from {
      transform: translateY(-50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #5c6c7c;
`;

const FormTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #2c3e50;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
`;

const InputGroup = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  background: #f8f9fa;
  border: 1px solid #e0e6ed;
  border-radius: 6px;
  color: #2c3e50;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
  }
`;

const Label = styled.label`
  position: absolute;
  left: 1rem;
  top: 0.75rem;
  color: #5c6c7c;
  font-size: 1rem;
  pointer-events: none;
  transition: all 0.3s ease;
  background-color: transparent;
  padding: 0 0.3rem;

  ${Input}:focus + &,
  ${Input}:not(:placeholder-shown) + & {
    top: -0.6rem;
    left: 0.6rem;
    font-size: 0.75rem;
    color: #007bff;
    background-color: white;
  }
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  border: none;
  border-radius: 6px;
  padding: 0.75rem 1.5rem;
  color: white;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(44, 62, 80, 0.1);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  margin-top: 1.5rem;
  width: 100%;

  &:hover {
    background-color: #0056b3;
    box-shadow: 0 6px 12px rgba(44, 62, 80, 0.15);
  }
`;

const ErrorMessage = styled.p`
  color: #dc3545;
  text-align: center;
  margin-top: -0.5rem;
  font-size: 0.9rem;
`;

const SwitchButton = styled.div`
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #5c6c7c;

  button {
    background: none;
    border: none;
    color: #007bff;
    cursor: pointer;
    font-weight: 600;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const AuthModal = ({
  show,
  formType,
  onClose,
  onToggleForm,
  onSuccessAuth,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const endpoint = formType === "login" ? "login" : "register";
    try {
      const response = await axios.post(
        `http://localhost:5000/api/auth/${endpoint}`,
        { username, password }
      );

      if (formType === "login") {
        onSuccessAuth(response.data.token);
      } else {
        alert("Registration successful! You can now log in.");
        onToggleForm();
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Network error. Please try again.");
      }
      console.error("Auth API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalOverlay show={show} onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <FormTitle>
          {formType === "login" ? "Welcome Back!" : "Create Your Account"}
        </FormTitle>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Input
              type="text"
              name="username"
              placeholder=" "
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Label htmlFor="username">Username</Label>
          </InputGroup>
          <InputGroup>
            <Input
              type="password"
              name="password"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Label htmlFor="password">Password</Label>
          </InputGroup>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <SubmitButton type="submit" disabled={loading}>
            {loading
              ? formType === "login"
                ? "Logging In..."
                : "Signing Up..."
              : formType === "login"
              ? "Log In"
              : "Sign Up"}
          </SubmitButton>
        </Form>
        <SwitchButton>
          {formType === "login" ? (
            <>
              Don't have an account?{" "}
              <button type="button" onClick={onToggleForm}>
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button type="button" onClick={onToggleForm}>
                Log In
              </button>
            </>
          )}
        </SwitchButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AuthModal;
