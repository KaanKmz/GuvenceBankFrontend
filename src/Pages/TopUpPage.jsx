import React, { useEffect, useState } from "react";
import axios from "../Api/Api";

const TopUpPage = () => {
    const [amount, setAmount] = useState("");
    const [balance, setBalance] = useState(null);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const fetchBalance = async () => {
        try {
            const res = await axios.get("/Bank/balance");
            setBalance(res.data.balance); 
        } catch (err) {
            console.error("Bakiye alınamadı:", err);
            setError("Banka bakiyesi alınamadı.");
        }
    };

    const handleTopUp = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            setError("Geçerli bir tutar girin.");
            return;
        }

        try {
            await axios.post("/Bank/topup", { amount: parsedAmount });
            setMessage("Bakiye başarıyla yüklendi.");
            setAmount("");
            fetchBalance(); 
        } catch (err) {
            console.error("TopUp hatası:", err);
            setError("Bakiye yüklenemedi.");
        }
    };

    useEffect(() => {
        fetchBalance();
    }, []);

    return (
        <div style={{
            maxWidth: 400,
            margin: "80px auto",
            fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
            padding: 20,
            backgroundColor: "#f8f9f4",
            borderRadius: 8,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
        }}>
            <h2 style={{ color: "#00583F", marginBottom: 30, textAlign: "center" }}>
                Banka Bakiye Yükleme
            </h2>

            {balance !== null && (
                <p
                    style={{
                        backgroundColor: "#D1E7DD",
                        color: "#0F5132",
                        padding: 10,
                        borderRadius: 5,
                        marginBottom: 20,
                        textAlign: "center",
                        fontWeight: "600",
                    }}
                >
                    Mevcut Banka Bakiyesi: {balance} ₺
                </p>
            )}

            {error && (
                <p
                    style={{
                        backgroundColor: "#F8D7DA",
                        color: "#842029",
                        padding: 10,
                        borderRadius: 5,
                        marginBottom: 20,
                        textAlign: "center",
                        fontWeight: "600",
                    }}
                >
                    {error}
                </p>
            )}

            {message && (
                <p
                    style={{
                        backgroundColor: "#D1E7DD",
                        color: "#0F5132",
                        padding: 10,
                        borderRadius: 5,
                        marginBottom: 20,
                        textAlign: "center",
                        fontWeight: "600",
                    }}
                >
                    {message}
                </p>
            )}

            <form onSubmit={handleTopUp} style={{ display: "flex", flexDirection: "column", gap: 15 }}>
                <input
                    type="number"
                    placeholder="Yüklenecek Tutar"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    style={{
                        padding: 12,
                        borderRadius: 5,
                        border: "1px solid #ccc",
                        fontSize: 16,
                        outline: "none",
                        boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)"
                    }}
                />
                <button
                    type="submit"
                    style={{
                        backgroundColor: "#00583F",
                        color: "white",
                        padding: 12,
                        borderRadius: 5,
                        fontWeight: "600",
                        cursor: "pointer",
                        border: "none",
                        fontSize: 16,
                        transition: "background-color 0.3s ease"
                    }}
                    onMouseEnter={e => (e.target.style.backgroundColor = "#007341")}
                    onMouseLeave={e => (e.target.style.backgroundColor = "#00583F")}
                >
                    Yükle
                </button>
            </form>
        </div>
    );
};

export default TopUpPage;
