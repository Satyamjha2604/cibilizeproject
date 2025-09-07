import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';

const glow = keyframes`
  0% { box-shadow: 0 0 5px var(--accent-purple); }
  50% { box-shadow: 0 0 10px var(--accent-blue), 0 0 20px var(--accent-blue); }
  100% { box-shadow: 0 0 5px var(--accent-purple); }
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 16px;
  color: var(--light-gray);
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  color: var(--light-gray);
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: var(--accent-blue);
    box-shadow: 0 0 8px var(--accent-blue);
  }
`;

const Button = styled.button`
  background: linear-gradient(45deg, var(--accent-purple), var(--accent-blue));
  border: none;
  border-radius: 50px;
  padding: 12px 25px;
  color: var(--dark-black);
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const CreditScoreGenerator = ({ onClose, onScoreCalculated }) => {
    const [formData, setFormData] = useState({
        income: 50000,
        loanAmount: 10000,
        utilization: 25,
        missedEMIs: 0,
        age: 30
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: parseFloat(value) }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('http://localhost:5000/api/dashboard/simulate-score', formData, {
                headers: { 'x-auth-token': token }
            });
            onScoreCalculated(res.data.simulatedScore);
            onClose();
        } catch (err) {
            console.error('Error simulating score:', err);
            alert('Failed to calculate score. Please try again.');
        }
    };

    return (
        <FormContainer onSubmit={handleSubmit}>
            <h3>Simulate Your Score</h3>
            <InputGroup>
                <Label>Monthly Income</Label>
                <Input type="number" name="income" value={formData.income} onChange={handleChange} />
            </InputGroup>
            <InputGroup>
                <Label>Existing Loan Amount</Label>
                <Input type="number" name="loanAmount" value={formData.loanAmount} onChange={handleChange} />
            </InputGroup>
            <InputGroup>
                <Label>Credit Utilization (%)</Label>
                <Input type="number" name="utilization" value={formData.utilization} onChange={handleChange} />
            </InputGroup>
            <InputGroup>
                <Label>Missed EMIs (last 12 months)</Label>
                <Input type="number" name="missedEMIs" value={formData.missedEMIs} onChange={handleChange} />
            </InputGroup>
            <InputGroup>
                <Label>Age</Label>
                <Input type="number" name="age" value={formData.age} onChange={handleChange} />
            </InputGroup>
            <Button type="submit">Get Simulated Score</Button>
        </FormContainer>
    );
};

export default CreditScoreGenerator;