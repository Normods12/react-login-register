import React, { useState } from 'react';
import axios from 'axios';

function Register({ onSwitchToLogin }) {
    // Note: 'role' is included here. If your backend sets roles automatically, you can remove it.
    const [credentials, setCredentials] = useState({ username: "", password: "", role: "" });
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function changeHandler(event) {
        const { name, value } = event.target;
        setCredentials(c => ({ ...c, [name]: value }));
        setError(""); // Clear messages when typing
        setSuccessMsg("");
    }

    function handleRegister(event) {
        event.preventDefault();

        if (!credentials.username || !credentials.password) {
            setError("Username and password are required.");
            return;
        }

        setIsLoading(true);

        axios.post(`http://localhost:8080/register`, credentials)
            .then(response => {
                setSuccessMsg("Registration successful! You can now log in.");
                setCredentials({ username: "", password: "", role: "" }); // Clear form
            })
            .catch(error => {
                console.error("Register Error:", error);
                setError(error.response?.data?.message || "Registration failed. Username might be taken.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={{ textAlign: "center" }}>Create Account</h2>

                {error && <div style={styles.errorBox}>{error}</div>}
                {successMsg && <div style={styles.successBox}>{successMsg}</div>}

                <form onSubmit={handleRegister} style={styles.form}>
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

                    {/* Optional: Dropdown for Roles instead of open text */}
                    <select name="role" value={credentials.role} onChange={changeHandler} style={styles.input}>
                        <option value="" disabled>Select a Role</option>
                        <option value="CASHIER">CASHIER</option>
                        <option value="PHARMACIST">PHARMACIST</option>
                    </select>

                    <button type="submit" disabled={isLoading} style={styles.button}>
                        {isLoading ? "Creating Account..." : "Register"}
                    </button>
                </form>

                <p style={styles.switchText}>
                    Already have an account? <span onClick={onSwitchToLogin} style={styles.link}>Log in here</span>
                </p>
            </div>
        </div>
    );
}

const styles = {
    container: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f4f4f9" },
    card: { padding: "30px", borderRadius: "8px", backgroundColor: "white", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", width: "300px" },
    form: { display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" },
    input: { padding: "10px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "16px", backgroundColor: "white" },
    button: { padding: "10px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "4px", fontSize: "16px", cursor: "pointer" },
    errorBox: { backgroundColor: "#ffe6e6", color: "#d9534f", padding: "10px", borderRadius: "4px", fontSize: "14px", textAlign: "center" },
    successBox: { backgroundColor: "#d4edda", color: "#155724", padding: "10px", borderRadius: "4px", fontSize: "14px", textAlign: "center" },
    switchText: { textAlign: "center", marginTop: "15px", fontSize: "14px" },
    link: { color: "#007bff", cursor: "pointer", textDecoration: "underline" }
};

export default Register;