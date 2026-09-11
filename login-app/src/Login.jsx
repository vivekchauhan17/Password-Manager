import React from "react";


export default function Login() {

    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:3000/Oauth/google";
    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>

                <h1>Welcome Back</h1>
                <p style={styles.subtitle}>Sign in to continue</p>

                <button
                    onClick={handleGoogleLogin}
                    style={styles.googleButton}
                >
                    <span style={styles.googleIcon}>G</span>
                    Continue with Google
                </button>

                <div style={styles.divider}>
                    <span>or</span>
                </div>

                <form>
                    <label>Email</label>

                    <input
                        type="email"
                        placeholder="you@example.com"
                        style={styles.input}
                    />

                    <label>Password</label>

                    <input
                        type="password"
                        placeholder="••••••••"
                        style={styles.input}
                    />

                    <button
                        type="submit"
                        style={styles.loginButton}
                    >
                        Sign in
                    </button>
                </form>

            </div>
        </div>
    );
}

const styles = {
    page: {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f7fb",
        fontFamily: "Arial, sans-serif",
    },

    card: {
        width: "380px",
        padding: "40px",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
    },

    subtitle: {
        color: "#666",
        marginBottom: "30px",
    },

    googleButton: {
        width: "100%",
        padding: "12px",
        border: "1px solid #ddd",
        borderRadius: "6px",
        background: "#fff",
        cursor: "pointer",
        fontSize: "15px",
    },

    googleIcon: {
        fontWeight: "bold",
        marginRight: "10px",
    },

    divider: {
        display: "flex",
        justifyContent: "center",
        margin: "25px 0",
        color: "#888",
    },

    input: {
        width: "100%",
        boxSizing: "border-box",
        padding: "12px",
        margin: "8px 0 18px",
        border: "1px solid #ddd",
        borderRadius: "6px",
        fontSize: "14px",
    },

    loginButton: {
        width: "100%",
        padding: "12px",
        border: "none",
        borderRadius: "6px",
        background: "#111827",
        color: "#fff",
        cursor: "pointer",
        fontSize: "15px",
    },
};