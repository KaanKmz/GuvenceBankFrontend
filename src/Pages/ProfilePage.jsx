import React, { useEffect, useState } from "react";
import axios from "../Api/Api";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const [passwordMessage, setPasswordMessage] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [error, setError] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const [generalMessage, setGeneralMessage] = useState(""); 

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get("/Auth/me");
                setUser(res.data);
                setUsername(res.data.username);
                setEmail(res.data.email);
            } catch (err) {
                setError("Profil bilgileri alınamadı.");
                if (err.response?.status === 401) {
                    navigate("/login");
                }
            }
        };
        fetchProfile();
    }, [navigate]);

    const validateProfileForm = () => {
        const errors = {};
        if (!username) errors.username = "Kullanıcı adı boş bırakılamaz.";
        if (!email) errors.email = "Email boş bırakılamaz.";
        else if (!email.includes("@")) errors.email = "Geçerli bir email girin.";
        return errors;
    };

    const validatePasswordForm = () => {
        const errors = {};
        if (!currentPassword) errors.currentPassword = "Mevcut şifre boş bırakılamaz.";
        if (!newPassword) errors.newPassword = "Yeni şifre boş bırakılamaz.";
        return errors;
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setFormErrors({});
        setGeneralMessage("");

        const errors = validateProfileForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        try {
            await axios.put("/Auth/profile", { username, email });
            setGeneralMessage("Bilgiler başarıyla güncellendi.");
        } catch (err) {
            setGeneralMessage("Güncelleme sırasında bir hata oluştu.");
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setPasswordMessage("");
        setPasswordError("");

        if (!currentPassword || !newPassword) {
            setPasswordError("Lütfen mevcut ve yeni şifrenizi girin.");
            return;
        }

        try {
            await axios.put("/Auth/changepassword", {
                CurrentPassword: currentPassword,
                NewPassword: newPassword,
            });
            setPasswordMessage("Şifre başarıyla değiştirildi.");
            setCurrentPassword("");
            setNewPassword("");
        } catch (error) {
            console.error("Şifre değiştirme hatası:", error.response?.data || error.message);
            setPasswordError("Şifre değiştirme başarısız oldu. Mevcut şifrenizi kontrol edin.");
        }
    };


    const handleDelete = async () => {
        if (!window.confirm("Hesabını silmek istediğine emin misin?")) return;
        try {
            await axios.delete("/Auth/profile");
            localStorage.removeItem("token");
            navigate("/register");
        } catch (err) {
            alert("Hesap silinirken hata oluştu.");
        }
    };

    if (!user) return <p>Yükleniyor...</p>;

    return (
        <div style={{ maxWidth: "600px", margin: "40px auto", fontFamily: "Segoe UI" }}>
            <h2 style={{ color: "#17594A" }}>Profil Sayfası</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {generalMessage && <p style={{ color: "green" }}>{generalMessage}</p>}

            <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "10px", marginBottom: "30px" }}>
                <form onSubmit={handleUpdate}>
                    <label>Kullanıcı Adı</label>
                    <input
                        type="text"
                        placeholder="Kullanıcı Adı"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
                    />
                    {formErrors.username && <p style={{ color: "red" }}>{formErrors.username}</p>}

                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
                    />
                    {formErrors.email && <p style={{ color: "red" }}>{formErrors.email}</p>}

                    <button type="submit" style={{ backgroundColor: "#17594A", color: "#fff", padding: "10px 20px", border: "none", borderRadius: "5px" }}>
                        Güncelle
                    </button>
                </form>
            </div>

            <h3 style={{ color: "#17594A" }}>Şifre Değiştir</h3>
            <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "10px" }}>
                <form onSubmit={handlePasswordChange}>
                    <label>Mevcut Şifre</label>
                    <input
                        type="password"
                        placeholder="Mevcut Şifre"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
                    />

                    <label>Yeni Şifre</label>
                    <input
                        type="password"
                        placeholder="Yeni Şifre"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
                    />

                    <button type="submit" style={{ backgroundColor: "#17594A", color: "#fff", padding: "10px 20px", border: "none", borderRadius: "5px" }}>
                        Şifreyi Güncelle
                    </button>
                </form>

                {passwordMessage && <p style={{ color: "green", marginTop: "10px" }}>{passwordMessage}</p>}
                {passwordError && <p style={{ color: "red", marginTop: "10px" }}>{passwordError}</p>}
            </div>

            <br />
            <button onClick={handleDelete} style={{ backgroundColor: "red", color: "#fff", padding: "10px 20px", border: "none", borderRadius: "5px" }}>
                Hesabımı Sil
            </button>
        </div>
    );
};

export default ProfilePage;
