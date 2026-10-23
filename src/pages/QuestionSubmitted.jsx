import { styles } from "../styles/styles";

export default function QuestionSubmitted({
  lastSubmittedQuestion,
  setCurrentView,
}) {
  return (
    <div>
      <h1 style={styles.pageHeading}>Question submitted</h1>
      <div style={{ ...styles.card, maxWidth: "640px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#16a34a",
            fontSize: "20px",
            fontWeight: "700",
            marginBottom: "20px",
          }}
        >
          <span>✓</span>
          <span>Your question was posted</span>
        </div>

        <div
          style={{
            backgroundColor: "#f1f5f9",
            borderRadius: "10px",
            padding: "20px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{ fontSize: "18px", fontWeight: "700", marginBottom: "8px" }}
          >
            {lastSubmittedQuestion || "Do these shoes run true to size?"}
          </div>
          <div style={{ fontSize: "14px", color: "#64748b" }}>
            Status: Waiting for a buyer response
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <button
            style={styles.yellowBtn}
            onClick={() => setCurrentView("details")}
          >
            View buying options
          </button>
          <button
            style={styles.grayBtn}
            onClick={() => setCurrentView("details")}
          >
            Back to product
          </button>
        </div>
      </div>
    </div>
  );
}
