import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../config";
import "./Dashboard.css";
import AddTransaction from "./AddTransaction";

function Dashboard({ token }) {
  const [user, setUser] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [transactionType, setTransactionType] = useState('income');
  const navigate = useNavigate();

  const calculateTotals = (transactions) => {
    const inc = transactions.filter(t => t.type === "income").reduce((acc, cur) => acc + cur.amount, 0);
    const exp = transactions.filter(t => t.type === "expense").reduce((acc, cur) => acc + cur.amount, 0);
    setIncome(inc);
    setExpense(exp);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await axios.get(`${BASE_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userRes.data);

        const trxRes = await axios.get(`${BASE_URL}/api/transactions`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions(trxRes.data);
        calculateTotals(trxRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [token]);

  const deleteTransaction = async (id) => {
    if (!window.confirm("Delete this transaction?")) return;

    try {
      await axios.delete(`${BASE_URL}/api/transactions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updated = transactions.filter((t) => t._id !== id);
      setTransactions(updated);
      calculateTotals(updated);
    } catch (err) {
      console.error("Error deleting transaction:", err.response?.data || err.message);
    }
  };

  const refreshTransactions = async () => {
    try {
      const trxRes = await axios.get(`${BASE_URL}/api/transactions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(trxRes.data);
      calculateTotals(trxRes.data);
    } catch (err) {
      console.error("Error refreshing transactions:", err);
    }
  };

  // ... Rest of your dashboard JSX
}

export default Dashboard;
