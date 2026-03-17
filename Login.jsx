import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLoginSuccess, onSwitchToRegister }) {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function changeHandler(event) {
        const { name, value } = event.target;
        setCredentials(c => ({ ...c, [name]: value }));
        setError(""); // Clear error when user starts typing again
    }

    function handleLogin(event) {
        event.preventDefault();

        // Basic validation
        if (!credentials.username || !credentials.password) {
            setError("Please fill in all fields.");
            return;
        }

        setIsLoading(true);

        // Update this URL based on your backend
        axios.post(`http://localhost:8080/login`, credentials)
            .then(response => {
                // Pass the JWT token back up to App.jsx
                onLoginSuccess(response.data);
            })
            .catch(error => {
                console.error("Login Error:", error);
                setError(error.response?.data?.message || "Invalid username or password.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={{ textAlign: "center" }}>Welcome Back</h2>

                {error && <div style={styles.errorBox}>{error}</div>}

                <form onSubmit={handleLogin} style={styles.form}>
                    <input
                        name="username"
                        value={credentials.username}
                        onChange={changeHandler}
                        placeholder="Username"
                        style={styles.input}
                    />
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={changeHandler}
                        placeholder="Password"
                        style={styles.input}
                    />

                    <button type="submit" disabled={isLoading} style={styles.button}>
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p style={styles.switchText}>
                    Don't have an account? <span onClick={onSwitchToRegister} style={styles.link}>Register here</span>
                </p>
            </div>
        </div>
    );
}

// Basic, clean styles you can reuse anywhere
const styles = {
    container: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f4f4f9" },
    card: { padding: "30px", borderRadius: "8px", backgroundColor: "white", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", width: "300px" },
    form: { display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" },
    input: { padding: "10px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "16px" },
    button: { padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", fontSize: "16px", cursor: "pointer" },
    errorBox: { backgroundColor: "#ffe6e6", color: "#d9534f", padding: "10px", borderRadius: "4px", fontSize: "14px", textAlign: "center" },
    switchText: { textAlign: "center", marginTop: "15px", fontSize: "14px" },
    link: { color: "#007bff", cursor: "pointer", textDecoration: "underline" }
};

export default Login;