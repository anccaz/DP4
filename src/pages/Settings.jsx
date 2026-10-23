import { styles } from "../styles/styles";

export default function Settings({ setCurrentView }) {
  return (
    <div>
      <span style={styles.subLabel}>Settings</span>
      <h1 style={styles.pageHeading}>Your preferences</h1>

      <div style={styles.card}>
        <h3
          style={{
            fontSize: "20px",
            fontWeight: "700",
            marginBottom: "20px",
          }}
        >
          Display and notifications
        </h3>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              backgroundColor: "#f1f5f9",
              padding: "18px 24px",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            Text size: Standard
          </div>
          <div
            style={{
              backgroundColor: "#f1f5f9",
              padding: "18px 24px",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            Notifications: Minimal
          </div>
          <div
            style={{
              backgroundColor: "#f1f5f9",
              padding: "18px 24px",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            Recommendations: User-controlled
          </div>
        </div>

        <button style={styles.yellowBtn} onClick={() => setCurrentView("home")}>
          Return to home
        </button>
      </div>
    </div>
  );
}
