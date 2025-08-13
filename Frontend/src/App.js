import "./App.css";
import Layout from "./Pages/Layout";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard"
import "./index.css";

import { BrowserRouter, Route, Routes } from "react-router";
import Settings from "./Pages/Setting";
import Transactions from "./Pages/Transactions";
import Reports from "./Pages/Reports";
import Notification from "./Pages/Notification";
import { useEffect } from "react";

function App() {
  useEffect(() => {
  const checkConnection = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/connection-status');
      const message = await res.text();
      console.log(message);
    } catch (err) {
      console.error('Error fetching connection status:', err);
    }
  };
  checkConnection();
}, []);


  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="signup" element={<Signup />}></Route>
          
          <Route path="main" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
            <Route path="notification" element={<Notification />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
