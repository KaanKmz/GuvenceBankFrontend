
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import HomePage from "./Pages/HomePage";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import ProfilePage from "./Pages/ProfilePage";
import TransactionsPage from "./Pages/TransactionsPage";
import TopUpPage from "./Pages/TopUpPage";
import TransfersPage from "./Pages/TransfersPage";

import "./index.css";

function App() {

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/transactions" element={<TransactionsPage />} />
                <Route path="/transfers" element={<TransfersPage />} />
                <Route path="/topup" element={<TopUpPage />} />
            </Routes>
        </Router>
    );
}

export default App;
