
import { useState } from "react";
import { styles } from "../styles/styles";

export default function Login({ setCurrentView }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setMessage("Please enter your email and password.");
      return;
    }

    setCurrentView("home");};

  return (
    <div style={{ maxWidth: "480px", margin: "40px auto" }}>
      <div style={styles.card}>
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <h1 style={{ fontSize: "28px", marginBottom: "8px" }}>
            Welcome back!
          </h1>

          <p style={{ color: "#64748b" }}>
            Sign in to your Shopping Hub account.
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <label style={{ display: "block", marginBottom: "8px" }}>
            Email address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "14px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              fontSize: "15px",
              marginBottom: "20px",
            }}
          />

          <label style={{ display: "block", marginBottom: "8px" }}>
            Password
          </label>

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "14px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              fontSize: "15px",
              marginBottom: "12px",
            }}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              background: "none",
              border: "none",
              color: "#64748b",
              cursor: "pointer",
              marginBottom: "20px",
            }}
          >
            {showPassword ? "Hide password" : "Show password"}
          </button>

          <div style={{ textAlign: "right", marginBottom: "20px" }}>
            <button
              type="button"
              onClick={() =>
                setMessage("Password recovery is a demo feature.")
              }
              style={{
                background: "none",
                border: "none",
                color: "#475569",
                cursor: "pointer",
              }}
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            style={{ ...styles.yellowBtn, width: "100%" }}
          >
            Sign In
          </button>
        </form>

        {message && (
          <p
            role="status"
            style={{
              marginTop: "20px",
              textAlign: "center",
              color: "#475569",
            }}
          >
            {message}
          </p>
        )}

        <div
          style={{
            textAlign: "center",
            marginTop: "24px",
            color: "#64748b",
          }}
        >
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => setMessage("Registration is a demo feature.")}
            style={{
              background: "none",
              border: "none",
              color: "#1e293b",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Sign Up
          </button>
        </div>

        <button
          type="button"
          onClick={() => setCurrentView("home")}
          style={{
            ...styles.grayBtn,
            width: "100%",
            marginTop: "20px",
          }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
