import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const Navbar = () => {
    const { token, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav style={{
            backgroundColor: "var(--primary-green)",
            padding: "10px 20px",
            display: "flex",
            gap: "20px",
            alignItems: "center",
            color: "var(--text-light)",
            fontWeight: "600",
            boxShadow: "0 2px 5px rgba(0,0,0,0.15)"
        }}>
            <Link to="/">
                <img
                    src="/logo.png" 
                    alt="Güvence Bankası"
                    style={{ height: "36px" }}
                />
            </Link>
            {!token && <Link to="/register" style={{ color: "var(--text-light)", textDecoration: "none" }}>Kayıt Ol</Link>}
            {!token && <Link to="/login" style={{ color: "var(--text-light)", textDecoration: "none" }}>Giriş Yap</Link>}
            {token && <Link to="/profile" style={{ color: "var(--text-light)", textDecoration: "none" }}>Profil</Link>}
            {token && <Link to="/transactions" style={{ color: "var(--text-light)", textDecoration: "none" }}>Masraflar</Link>}
            {token && <Link to="/transfers" style={{ color: "var(--text-light)", textDecoration: "none" }}>Para Transferleri</Link>}
            {token && <Link to="/topup" style={{ color: "var(--text-light)", textDecoration: "none" }}>Bakiye Yükleme</Link>}
            {token && (
                <button
                    onClick={handleLogout}
                    style={{
                        background: "none",
                        border: "1px solid var(--text-light)",
                        borderRadius: "4px",
                        padding: "4px 12px",
                        color: "var(--text-light)",
                        cursor: "pointer",
                        marginLeft: "auto",
                        fontWeight: "600"
                    }}
                    onMouseEnter={e => e.target.style.backgroundColor = "var(--button-hover)"}
                    onMouseLeave={e => e.target.style.backgroundColor = "transparent"}
                >
                    Oturumu Kapat
                </button>
            )}
        </nav>
    );
};

export default Navbar;
