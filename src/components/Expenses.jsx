import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import axios from "axios";

// ---------- Styled Components ----------
const Container = styled.div`
  padding: 30px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: "Montserrat", sans-serif;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;
const Title = styled.h2`
  color: #007bff;
`;
const Form = styled.form`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;
const Input = styled.input`
  padding: 10px;
  flex: 1;
  min-width: 150px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;
const Select = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
`;
const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0056b3;
  }
`;
const LogoutButton = styled(Button)`
  background-color: #dc3545;
  &:hover {
    background-color: #c82333;
  }
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  th,
  td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  }
  th {
    background: #f8f9fa;
  }
`;

const Expenses = ({ onLogout }) => {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food 🍔");
  const [file, setFile] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState("");

  const categories = [
    "Food 🍔",
    "Travel ✈️",
    "Shopping 🛍️",
    "Bills 💡",
    "Entertainment 🎮",
    "Utilities ⚡",
    "Other ❓",
  ];
  const colors = [
    "#007bff",
    "#ffc107",
    "#17a2b8",
    "#dc3545",
    "#6c757d",
    "#28a745",
    "#fd7e14",
  ];

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return {
      Authorization: `Bearer ${token}`,
    };
  };

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/expenses", {
        headers: getAuthHeader(),
      });
      setExpenses(response.data);
      setError("");
    } catch (err) {
      if (
        err.response &&
        (err.response.status === 401 || err.response.status === 403)
      ) {
        onLogout();
      }
      setError("Failed to fetch expenses. Please try logging in again.");
      console.error("Fetch expenses error:", err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    const dataMap = {};
    expenses.forEach((e) => {
      dataMap[e.category] = (dataMap[e.category] || 0) + parseFloat(e.amount);
    });
    setChartData(
      Object.keys(dataMap).map((k) => ({ category: k, amount: dataMap[k] }))
    );
  }, [expenses]);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!description || !amount) return;
    try {
      const newExpense = {
        description,
        amount,
        category,
        date: new Date().toISOString().slice(0, 10),
      };
      const response = await axios.post(
        "http://localhost:5000/api/expenses",
        newExpense,
        {
          headers: getAuthHeader(),
        }
      );
      setExpenses((prev) => [response.data, ...prev]);
      setDescription("");
      setAmount("");
      setCategory("Food 🍔");
      setError("");
    } catch (err) {
      setError("Failed to add expense. Please try again.");
      console.error("Add expense error:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/expenses/${id}`, {
        headers: getAuthHeader(),
      });
      setExpenses((prev) => prev.filter((e) => e.id !== id));
      setError("");
    } catch (err) {
      setError("Failed to delete expense. Please try again.");
      console.error("Delete expense error:", err);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:5000/api/expenses/upload", formData, {
        headers: {
          ...getAuthHeader(),
          "Content-Type": "multipart/form-data",
        },
      });
      // The crucial step: re-fetch expenses to update the UI
      fetchExpenses();
      setError("File uploaded and expenses processed successfully!");
    } catch (err) {
      setError("File upload failed.");
      console.error("Upload error:", err);
    }
  };

  return (
    <Container>
      <Header>
        <Title>Expense Tracker</Title>
        <LogoutButton onClick={onLogout}>Log Out</LogoutButton>
      </Header>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <Form onSubmit={handleAdd}>
        <Input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          placeholder="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </Select>
        <Button type="submit">Add</Button>
      </Form>

      <Form onSubmit={handleUpload}>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <Button type="submit" disabled={!file}>
          Upload Bank Statement
        </Button>
      </Form>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="amount"
            nameKey="category"
            outerRadius={80}
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={index} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#007bff" />
        </BarChart>
      </ResponsiveContainer>

      <Table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((e) => (
            <tr key={e.id}>
              <td>{e.description}</td>
              <td>{e.amount}</td>
              <td>{e.category}</td>
              <td>{e.date}</td>
              <td>
                <Button onClick={() => handleDelete(e.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Expenses;
