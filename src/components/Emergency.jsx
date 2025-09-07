import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const EmergencyContainer = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 100vh;
  font-family: "Montserrat", sans-serif;
  background: linear-gradient(180deg, #f0f4f8 0%, #ffffff 100%);
  color: var(--dark-text);

  @media (max-width: 768px) {
    padding: 30px;
  }
`;

const HeaderSection = styled.div`
  margin-bottom: 40px;
  max-width: 700px;

  h1 {
    font-size: 48px;
    font-weight: 800;
    margin-bottom: 10px;
    color: var(--primary-blue);
  }

  p {
    font-size: 18px;
    color: var(--light-text);
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 36px;
    }
    p {
      font-size: 16px;
    }
  }
`;

const FormCard = styled.div`
  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(44, 62, 80, 0.1);
  width: 100%;
  max-width: 650px;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    padding: 30px;
  }
`;

// Inline SVG component for the shield icon
const ShieldIcon = styled.svg.attrs({
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 512 512",
})`
  font-size: 60px;
  color: var(--primary-blue);
  margin-bottom: 20px;
  width: 60px;
  height: 60px;
  fill: currentColor;
`;

const ProgressContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin-bottom: 40px;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 4px;
    background-color: var(--border-color);
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    z-index: 1;
  }
`;

const ProgressStep = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;

  .number-circle {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: ${(props) =>
      props.active ? "var(--primary-blue)" : "var(--border-color)"};
    color: ${(props) => (props.active ? "white" : "var(--dark-text)")};
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    transition: background-color 0.3s ease;
  }

  p {
    font-size: 14px;
    margin-top: 10px;
    color: ${(props) =>
      props.active ? "var(--primary-blue)" : "var(--light-text)"};
    font-weight: 500;
  }
`;

const StepForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 100%;
`;

const InputGroup = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  background: white;
  border: 1px solid var(--border-color);
  border-radius: 30px;
  color: var(--dark-text);
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

  &:focus {
    border-color: var(--primary-blue);
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 15px;
  background: white;
  border: 1px solid var(--border-color);
  border-radius: 30px;
  color: var(--dark-text);
  font-size: 16px;
  outline: none;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23707070' width='24px' height='24px'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 20px top 50%;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

  &:focus {
    border-color: var(--primary-blue);
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2);
  }
`;

const Label = styled.label`
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--light-text);
  font-size: 16px;
  pointer-events: none;
  transition: all 0.3s ease;
  background-color: transparent;

  ${Input}:focus + &,
  ${Input}:not(:placeholder-shown) + & {
    top: -10px;
    left: 15px;
    font-size: 12px;
    color: var(--primary-blue);
    padding: 0 5px;
    background-color: white;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(
    90deg,
    var(--primary-blue),
    var(--secondary-blue)
  );
  border: none;
  border-radius: 30px;
  padding: 15px 30px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.25);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-top: 25px;
  width: 100%;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 6px 20px rgba(0, 123, 255, 0.35);
  }
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: var(--light-text);
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 15px;
  transition: color 0.3s ease;

  &:hover {
    color: var(--dark-text);
  }
`;

const SecondaryButton = styled(SubmitButton)`
  background: var(--soft-white);
  color: var(--dark-text);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: #e2e8f0;
    transform: none;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const SuccessContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  color: var(--dark-text);

  h3 {
    font-size: 28px;
    margin: 0;
    color: var(--primary-blue);
  }
  p {
    margin: 0;
    font-size: 16px;
    opacity: 0.8;
  }
`;

const StatusMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  min-height: 200px;
  p {
    font-size: 20px;
    font-weight: 600;
    color: var(--primary-blue);
  }
`;

const Loader = styled.div`
  border: 4px solid var(--border-color);
  border-top: 4px solid var(--primary-blue);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
`;

// Inline SVG component for the checkmark icon
const CheckIcon = styled.svg.attrs({
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 512 512",
})`
  font-size: 60px;
  color: #28a745;
  width: 60px;
  height: 60px;
  fill: currentColor;
`;

const ArrowLeftIcon = styled.svg.attrs({
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 448 512",
})`
  width: 1em;
  height: 1em;
  fill: currentColor;
  path {
    d: "M257.5 445.1l-180-180c-7.2-7.2-11.5-17.2-11.5-27.1s4.3-20.1 11.5-27.1l180-180c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L153.3 256 302.8 405.8c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0z";
  }
`;

const Emergency = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    reason: "card_theft",
    otherReason: "",
  });
  const [submissionStatus, setSubmissionStatus] = useState("idle");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1 && formData.name && formData.number) {
      setStep(2);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 2 && formData.reason) {
      setSubmissionStatus("submitting");
      setTimeout(() => {
        setSubmissionStatus("success");
        setFormData({
          name: "",
          number: "",
          reason: "card_theft",
          otherReason: "",
        });
        setTimeout(() => {
          setSubmissionStatus("idle");
          setStep(1);
        }, 3000);
      }, 2000);
    }
  };

  return (
    <EmergencyContainer>
      <HeaderSection>
        <h1>🚨 Emergency Assistance</h1>
        <p>Quickly report issues like card theft or suspicious activity.</p>
      </HeaderSection>
      <FormCard>
        {submissionStatus === "idle" && (
          <>
            <ShieldIcon>
              <path d="M46.7 448c-1.4 1.4-2.8 2.8-4.2 4.2-1.4 1.4-2.8 2.8-4.2 4.2-3.8 3.8-7.6 7.6-11.4 11.4l-240 240c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L282.7 256 123.5 96.2c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l180 180c7.2 7.2 11.5 17.2 11.5 27.1s-4.3 20.1-11.5 27.1z" />
            </ShieldIcon>
            <ProgressContainer>
              <ProgressStep active={step === 1}>
                <div className="number-circle">1</div>
                <p>Contact Info</p>
              </ProgressStep>
              <ProgressStep active={step === 2}>
                <div className="number-circle">2</div>
                <p>Emergency Details</p>
              </ProgressStep>
            </ProgressContainer>

            {step === 1 && (
              <StepForm onSubmit={handleNextStep}>
                <InputGroup>
                  <Input
                    type="text"
                    name="name"
                    placeholder=" "
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <Label htmlFor="name">Full Name</Label>
                </InputGroup>
                <InputGroup>
                  <Input
                    type="tel"
                    name="number"
                    placeholder=" "
                    value={formData.number}
                    onChange={handleChange}
                    required
                  />
                  <Label htmlFor="number">Contact Number</Label>
                </InputGroup>
                <SubmitButton type="submit">Next</SubmitButton>
              </StepForm>
            )}
            {step === 2 && (
              <StepForm onSubmit={handleSubmit}>
                <InputGroup>
                  <Select
                    name="reason"
                    id="reason"
                    value={formData.reason}
                    onChange={handleChange}
                  >
                    <option value="card_theft">Credit Card Theft</option>
                    <option value="identity_theft">Identity Theft</option>
                    <option value="suspicious_activity">
                      Suspicious Activity
                    </option>
                    <option value="other">Other</option>
                  </Select>
                </InputGroup>
                {formData.reason === "other" && (
                  <InputGroup>
                    <Input
                      type="text"
                      name="otherReason"
                      placeholder=" "
                      value={formData.otherReason}
                      onChange={handleChange}
                      required
                    />
                    <Label htmlFor="otherReason">Please specify</Label>
                  </InputGroup>
                )}
                <SubmitButton type="submit">Submit Request</SubmitButton>
                <BackButton onClick={() => setStep(1)}>
                  <ArrowLeftIcon>
                    <path d="M257.5 445.1l-180-180c-7.2-7.2-11.5-17.2-11.5-27.1s4.3-20.1 11.5-27.1l180-180c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L153.3 256 302.8 405.8c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0z" />
                  </ArrowLeftIcon>
                  Back
                </BackButton>
              </StepForm>
            )}
          </>
        )}
        {submissionStatus === "submitting" && (
          <StatusMessage>
            <Loader />
            <p>Processing request...</p>
          </StatusMessage>
        )}
        {submissionStatus === "success" && (
          <SuccessContent>
            <CheckIcon>
              <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 464c-11.8 0-23.7-1.3-35.3-3.9-39.7-8.9-74.8-28.9-104.9-57.9-30.1-29-50.1-64.1-59-103.8-2.6-11.6-3.9-23.5-3.9-35.3 0-11.8 1.3-23.7 3.9-35.3 8.9-39.7 28.9-74.8 57.9-104.9 29-30.1 64.1-50.1 103.8-59 11.6-2.6 23.5-3.9 35.3-3.9 11.8 0 23.7 1.3 35.3 3.9 39.7 8.9 74.8 28.9 104.9 57.9 30.1 29 50.1 64.1 59 103.8 2.6 11.6 3.9 23.5 3.9 35.3 0 11.8-1.3 23.7-3.9 35.3-8.9 39.7-28.9 74.8-57.9 104.9-29 30.1-64.1 50.1-103.8 59-11.6 2.6-23.5 3.9-35.3 3.9zm101.9-281.8l-123.5 123.5c-4.7 4.7-10.9 7.1-17.1 7.1-6.2 0-12.4-2.4-17.1-7.1L123.5 282.7c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L242 334.7l105.8-105.8c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
            </CheckIcon>
            <h3>Request Sent!</h3>
            <p>A representative will contact you shortly.</p>
            <SecondaryButton onClick={() => setSubmissionStatus("idle")}>
              Go Back
            </SecondaryButton>
          </SuccessContent>
        )}
      </FormCard>
    </EmergencyContainer>
  );
};

export default Emergency;
