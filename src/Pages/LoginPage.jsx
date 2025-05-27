import React, { useState } from "react";
import axios from "../Api/Api";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await axios.post("/Auth/login", { email, password });
            const token = response.data.token;
            localStorage.setItem("token", token);
            navigate("/profile"); // login sonrası profil sayfasına yönlendir
            window.location.reload(); // navbar güncellemesi için sayfa yenile
        } catch (err) {
            setError("Email veya şifre hatalı.");
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "80px auto", fontFamily: "Segoe UI" }}>
            <h2 style={{ color: "#00583F", marginBottom: 30, textAlign: "center" }}>
                Giriş Yap
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

            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 15 }}>
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
                    Giriş Yap
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
