import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import axios from 'axios';

const API_BASE = 'https://casestudy-backend.onrender.com';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/');

    axios.get(`${API_BASE}/api/expenses`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => setExpenses(res.data))
    .catch(() => navigate('/'));
  }, [navigate]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <ul>
        {expenses.map((e, idx) => (
          <li key={idx}>{e.title}: ₹{e.amount}</li>
        ))}
      </ul>
    </Container>
  );
};

export default DashboardPage;