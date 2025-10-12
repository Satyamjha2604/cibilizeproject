import React, { useState } from "react";
import styled from "styled-components";

// ---------- Styled Components ----------
const Container = styled.div`
  max-width: 350px;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  padding: 16px;
  font-family: "Montserrat", sans-serif;
`;

const Header = styled.h2`
  text-align: center;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: #007bff;
`;

const MessagesContainer = styled.div`
  height: 250px;
  overflow-y: auto;
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 8px;
  margin-bottom: 12px;
`;

const Message = styled.div`
  margin: 6px 0;
  padding: 8px 10px;
  border-radius: 12px;
  max-width: 80%;
  ${(props) =>
    props.sender === "user"
      ? "background-color: #007bff; color: #fff; align-self: flex-end; text-align: right;"
      : "background-color: #e2e3e5; color: #000; align-self: flex-start; text-align: left;"}
`;

const InputContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  outline: none;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 8px 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0056b3;
  }
`;

const ChatAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };
    setMessages([...messages, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });

      const data = await res.json();
      const aiMessage = { sender: "ai", text: data.reply };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "⚠️ Error: Unable to connect to AI assistant." },
      ]);
    }

    setLoading(false);
  };

  return (
    <Container>
      <Header>🤖 AI Credit Advisor</Header>

      <MessagesContainer>
        {messages.map((msg, idx) => (
          <Message key={idx} sender={msg.sender}>
            {msg.text}
          </Message>
        ))}
        {loading && (
          <p style={{ fontSize: "0.85rem", color: "#6c757d" }}>
            AI is thinking...
          </p>
        )}
      </MessagesContainer>

      <InputContainer>
        <Input
          placeholder="Ask me about credit..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <Button onClick={handleSend}>Send</Button>
      </InputContainer>
    </Container>
  );
};

export default ChatAssistant;
