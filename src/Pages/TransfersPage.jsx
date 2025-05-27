import React, { useEffect, useState } from "react";
import axios from "../Api/Api";

const TransfersPage = () => {
    const [transfers, setTransfers] = useState([]);
    const [balance, setBalance] = useState(null);
    const [receiverUsername, setReceiverUsername] = useState("");
    const [amount, setAmount] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [editingTransferId, setEditingTransferId] = useState(null);
    const [editAmount, setEditAmount] = useState("");
    const [transferSuccess, setTransferSuccess] = useState("");
    const [transferError, setTransferError] = useState("");


    const fetchTransfers = async () => {
        try {
            const res = await axios.get("/Transfers");
            setTransfers(res.data);
        } catch (err) {
            console.error("Transferler alınamadı:", err);
        }
    };

    const fetchBalance = async () => {
        try {
            const res = await axios.get("/Bank/balance");
            setBalance(res.data.balance);
        } catch (err) {
            console.error("Bakiye alınamadı:", err);
        }
    };

    const handleEditClick = (transfer) => {
        setEditingTransferId(transfer.id);
        setEditAmount(transfer.amount);
    };


    const handleUpdateTransfer = async () => {
        try {
            await axios.put(`/Transfers/${editingTransferId}`, {
                amount: parseFloat(editAmount),
            });
            setEditingTransferId(null);
            fetchBalance();
            fetchTransfers();
        } catch (err) {
            alert("Transfer güncellenemedi: " + (err.response?.data || err.message));
        }
    };



    const handleTransfer = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        if (!receiverUsername || !amount || isNaN(amount) || amount <= 0) {
            setError("Lütfen geçerli alıcı ve tutar girin.");
            return;
        }

        try {
            await axios.post("/Transfers", {
                ReceiverUsername: receiverUsername,
                Amount: parseFloat(amount),
            });
            setMessage("Transfer başarılı.");
            setReceiverUsername("");
            setAmount("");
            fetchTransfers();
            fetchBalance();
        } catch (err) {
            console.error("Transfer hatası:", err);
            setError("Transfer işlemi başarısız oldu.");
        }
    };

    useEffect(() => {
        fetchTransfers();
        fetchBalance();
    }, []);

    return (
        <div
            style={{
                maxWidth: 600,
                margin: "80px auto",
                padding: 20,
                fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
                backgroundColor: "#f8f9f4",
                borderRadius: 8,
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
        >
            <h2 style={{ color: "#00583F", marginBottom: 20 }}>Para Transferi</h2>
            {balance !== null && (
                <p
                    style={{
                        backgroundColor: "#D1E7DD",
                        color: "#0F5132",
                        padding: 10,
                        borderRadius: 5,
                        marginBottom: 20,
                        fontWeight: "600",
                    }}
                >
                    Mevcut Bakiye: {balance} ₺
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
                        fontWeight: "600",
                    }}
                >
                    {message}
                </p>
            )}

            <form
                onSubmit={handleTransfer}
                style={{ display: "flex", gap: 10, marginBottom: 20 }}
            >
                <input
                    type="text"
                    placeholder="Alıcı Kullanıcı Adı"
                    value={receiverUsername}
                    onChange={(e) => setReceiverUsername(e.target.value)}
                    style={{
                        flex: 1,
                        padding: 12,
                        borderRadius: 5,
                        border: "1px solid #ccc",
                        fontSize: 16,
                    }}
                    required
                />
                <input
                    type="number"
                    placeholder="Tutar"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    style={{
                        width: 120,
                        padding: 12,
                        borderRadius: 5,
                        border: "1px solid #ccc",
                        fontSize: 16,
                    }}
                    required
                />
                <button
                    type="submit"
                    style={{
                        backgroundColor: "#00583F",
                        color: "white",
                        padding: "12px 20px",
                        borderRadius: 5,
                        border: "none",
                        fontWeight: "600",
                        cursor: "pointer",
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#007341")}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "#00583F")}
                >
                    Gönder
                </button>
            </form>

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr style={{ backgroundColor: "#00583F", color: "white" }}>
                        <th style={{ padding: "10px" }}>Gönderen</th>
                        <th style={{ padding: "10px" }}>Alıcı</th>
                        <th style={{ padding: "10px" }}>Tutar</th>
                        <th style={{ padding: "10px" }}>İşlem</th>
                    </tr>
                </thead>
                <tbody>
                    {transfers.map((t) =>
                        editingTransferId === t.id ? (
                            <tr key={t.id}>
                                <td colSpan="4" style={{ padding: "12px", backgroundColor: "#f1f1f1" }}>
                                    <input
                                        type="number"
                                        value={editAmount}
                                        onChange={(e) => setEditAmount(e.target.value)}
                                        placeholder="Yeni tutar"
                                        style={{ marginRight: 10, padding: 6, borderRadius: 5, border: "1px solid #ccc" }}
                                    />
                                    <button onClick={handleUpdateTransfer}>Kaydet</button>
                                    <button onClick={() => setEditingTransferId(null)}>İptal</button>
                                </td>
                            </tr>
                        ) : (
                            <tr key={t.id} style={{ borderBottom: "1px solid #ccc" }}>
                                <td style={{ padding: "8px" }}>{t.senderUsername}</td>
                                <td style={{ padding: "8px" }}>{t.receiverUsername}</td>
                                <td style={{ padding: "8px" }}>{t.amount} ₺</td>
                                <td style={{ padding: "8px" }}>
                                    <button
                                        onClick={() => handleEditClick(t)}
                                        style={{
                                            backgroundColor: "#00583F",
                                            color: "white",
                                            border: "none",
                                            borderRadius: 5,
                                            padding: "6px 12px",
                                            cursor: "pointer",
                                            fontWeight: "600",
                                        }}
                                    >
                                        Düzenle
                                    </button>
                                </td>
                            </tr>
                        )
                    )}
                </tbody>

            </table>
        </div>
    );
};

export default TransfersPage;
