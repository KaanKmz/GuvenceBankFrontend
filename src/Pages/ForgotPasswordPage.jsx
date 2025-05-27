import React, { useState } from "react";
import axios from "../Api/Api";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            

            setMessage("Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.");
            setEmail("");
        } catch (err) {
            setError("Bir hata oluştu, lütfen tekrar deneyin.");
        }
    };

    return (
        <div
            style={{
                maxWidth: 400,
                margin: "80px auto",
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                color: "#222",
                padding: 30,
                backgroundColor: "#F5F9F7",
                borderRadius: 8,
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
        >
            <h2 style={{ color: "#00583F", marginBottom: 30, textAlign: "center" }}>
                Şifremi Unuttum
            </h2>

            {error && (
                <p
                    style={{
                        backgroundColor: "#FDECEA",
                        color: "#D32F2F",
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

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 15 }}>
                <input
                    type="email"
                    placeholder="E-posta adresiniz"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                        padding: 12,
                        borderRadius: 5,
                        border: "1px solid #ccc",
                        fontSize: 16,
                    }}
                />
                <button
                    type="submit"
                    style={{
                        backgroundColor: "#00583F",
                        color: "#fff",
                        padding: 12,
                        borderRadius: 5,
                        fontWeight: "600",
                        cursor: "pointer",
                        border: "none",
                        fontSize: 16,
                    }}
                >
                    Gönder
                </button>
            </form>
        </div>
    );
};

export default ForgotPasswordPage;
