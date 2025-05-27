
import React, { useState } from "react";
import axios from "../Api/Api";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");
        try {
            await axios.post("/Auth/register", { username, email, password });
            setMessage("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...");
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            setError("Kayıt işlemi sırasında hata oluştu.");
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "80px auto", fontFamily: "Segoe UI" }}>
            <h2 style={{ color: "#00583F", marginBottom: 30, textAlign: "center" }}>
                Kayıt Ol
            </h2>

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

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 15 }}>
                <input
                    type="text"
                    placeholder="Kullanıcı Adı"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    style={{ padding: 12, borderRadius: 5, border: "1px solid #ccc", fontSize: 16 }}
                />
                <input
                    type="email"
                    placeholder="E-posta"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ padding: 12, borderRadius: 5, border: "1px solid #ccc", fontSize: 16 }}
                />
                <input
                    type="password"
                    placeholder="Şifre"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ padding: 12, borderRadius: 5, border: "1px solid #ccc", fontSize: 16 }}
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
                    }}
                >
                    Kayıt Ol
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;
    