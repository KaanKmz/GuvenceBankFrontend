import React, { useEffect, useState } from "react";
import axios from "../Api/Api";

const TransactionsPage = () => {
    const [balance, setBalance] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState("");
    const [categories, setCategories] = useState([]);

    const [categoryInput, setCategoryInput] = useState("");
    const [amountInput, setAmountInput] = useState("");
    const [descriptionInput, setDescriptionInput] = useState("");
    const [transactionError, setTransactionError] = useState("");


    const fetchBalance = async () => {
        try {
            const res = await axios.get("/Transactions/balance");
            setBalance(res.data.balance);
        } catch (error) {
            console.error("Bakiye alınamadı", error);
        }
    };

    const fetchTransactions = async (category = "") => {
        try {
            let url = "/Transactions";
            if (category) url += `/category/${category}`;
            const res = await axios.get(url);
            setTransactions(res.data);

            
            const uniqueCategories = [...new Set(res.data.map(t => t.category))];
            setCategories(uniqueCategories);
        } catch (error) {
            console.error("Masraflar alınamadı", error);
        }
    };

    useEffect(() => {
        fetchBalance();
        fetchTransactions();
    }, []);

    useEffect(() => {
        fetchTransactions(categoryFilter);
    }, [categoryFilter]);

    const handleAddTransaction = async (e) => {
        e.preventDefault();
        setTransactionError(""); 

        if (!categoryInput || !amountInput) {
            setTransactionError("Kategori ve tutar alanları zorunludur.");
            return;
        }

        try {
            await axios.post("/Transactions", {
                category: categoryInput,
                amount: parseFloat(amountInput),
                description: descriptionInput,
            });
            setCategoryInput("");
            setAmountInput("");
            setDescriptionInput("");
            fetchBalance();
            fetchTransactions(categoryFilter);
        } catch (error) {
            const msg = error.response?.data || "İşlem sırasında hata oluştu.";
            if (
                msg.toLowerCase().includes("insufficient") ||
                msg.toLowerCase().includes("bakiye") ||
                msg.toLowerCase().includes("yetersiz")
            ) {
                setTransactionError("Bakiyeniz yetersiz. Lütfen önce bakiye yükleyin.");
            } else {
                setTransactionError("Bir hata oluştu: " + msg);
            }
        }

    };

    const handleDeleteTransaction = async (id) => {
        if (!window.confirm("Bu masrafı silmek istediğine emin misin?")) return;

        try {
            await axios.delete(`/Transactions/${id}`);
            fetchTransactions(categoryFilter);
            fetchBalance();
        } catch (err) {
            alert("Masraf silinemedi.");
        }
    };



    return (
        <div style={{ maxWidth: 700, margin: "30px auto", fontFamily: "Segoe UI" }}>
            <h2 style={{ color: "#00583F", marginBottom: 20 }}>Masraflar</h2>

            {balance !== null && (
                <p
                    style={{
                        backgroundColor: "#E6F1E9",
                        color: "#00583F",
                        padding: 10,
                        borderRadius: 5,
                        fontWeight: 600,
                        marginBottom: 20,
                    }}
                >
                    Mevcut Bakiye: {balance} ₺
                </p>
            )}

            {/* Kategori filtresi dropdown */}
            <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                style={{
                    width: "100%",
                    padding: 10,
                    marginBottom: 20,
                    borderRadius: 5,
                    border: "1px solid #ccc",
                    fontSize: 16,
                }}
            >
                <option value="">Tüm Kategoriler</option>
                {categories.map((cat) => (
                    <option key={cat} value={cat}>
                        {cat}
                    </option>
                ))}
            </select>

            {/* Yeni masraf ekleme formu */}
            <form onSubmit={handleAddTransaction} style={{ marginBottom: 30, display: "flex", gap: 10 }}>
                <input
                    placeholder="Kategori"
                    value={categoryInput}
                    onChange={(e) => setCategoryInput(e.target.value)}
                    required
                    style={{ flex: 2, padding: 10, borderRadius: 5, border: "1px solid #ccc" }}
                />
                <input
                    placeholder="Tutar"
                    type="number"
                    value={amountInput}
                    onChange={(e) => setAmountInput(e.target.value)}
                    required
                    style={{ flex: 1, padding: 10, borderRadius: 5, border: "1px solid #ccc" }}
                />
                <input
                    placeholder="Açıklama (Opsiyonel)"
                    value={descriptionInput}
                    onChange={(e) => setDescriptionInput(e.target.value)}
                    style={{ flex: 3, padding: 10, borderRadius: 5, border: "1px solid #ccc" }}
                />
                <button
                    type="submit"
                    style={{
                        backgroundColor: "#00583F",
                        color: "white",
                        border: "none",
                        borderRadius: 5,
                        padding: "10px 20px",
                        fontWeight: "600",
                        cursor: "pointer",
                    }}
                >
                    Ekle
                </button>
            </form>

            {transactionError && (
                <p style={{ color: "red", marginBottom: 20 }}>{transactionError}</p>
            )}


            {/* Masraflar tablosu */}
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead style={{ backgroundColor: "#007A53", color: "white" }}>
                    <tr>
                        <th style={{ padding: 12, textAlign: "left" }}>Tarih</th>
                        <th style={{ padding: 12, textAlign: "left" }}>Kategori</th>
                        <th style={{ padding: 12, textAlign: "right" }}>Tutar</th>
                        <th style={{ padding: 12, textAlign: "left" }}>Açıklama</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.length === 0 ? (
                        <tr>
                            <td colSpan={4} style={{ padding: 12, textAlign: "center" }}>
                                Masraf bulunamadı.
                            </td>
                        </tr>
                    ) : (
                        transactions.map((t) => (
                            <tr key={t.id} style={{ borderBottom: "1px solid #ddd" }}>
                                <td style={{ padding: 12 }}>
                                    {new Date(t.createdAt).toLocaleDateString("tr-TR")}
                                </td>
                                <td style={{ padding: 12 }}>{t.category}</td>
                                <td style={{ padding: 12, textAlign: "right" }}>{t.amount} ₺</td>
                                <td style={{ padding: 12 }}>
                                    {t.description}
                                    <button
                                        onClick={() => handleDeleteTransaction(t.id)}
                                        style={{
                                            marginLeft: 12,
                                            backgroundColor: "#e74c3c",
                                            color: "white",
                                            border: "none",
                                            borderRadius: 4,
                                            padding: "4px 8px",
                                            fontSize: 12,
                                            cursor: "pointer",
                                        }}
                                    >
                                        Sil
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>

            </table>
        </div>
    );
};

export default TransactionsPage;
