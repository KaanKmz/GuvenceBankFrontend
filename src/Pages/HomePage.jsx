import React from "react";

const HomePage = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "85vh",
                backgroundColor: "#f9fbf9",
                flexDirection: "column",
            }}
        >
            <img
                src="/logo.png"
                alt="Güvence Bankası"
                style={{ width: "240px", maxWidth: "90%", height: "auto", marginBottom: 20 }}
            />
            <h2 style={{ color: "#00583F", fontSize: "24px", fontWeight: "600" }}>
                Bireysel Finans Yönetim Uygulaması
            </h2>
        </div>
    );
};

export default HomePage;
