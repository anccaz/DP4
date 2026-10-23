import { styles } from "../styles/styles";

export default function Messages({
  questions,
  newQuestionText,
  setNewQuestionText,
  handlePostQuestion,
  setCurrentView,
}) {
  return (
    <div>
      <h1 style={{ ...styles.pageHeading, marginTop: "0" }}>
        Ask Previous Buyers
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: "32px",
        }}
      >
        <div style={styles.card}>
          <h3
            style={{
              fontSize: "20px",
              fontWeight: "700",
              marginBottom: "20px",
            }}
          >
            Questions and answers
          </h3>

          {questions.map((item, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#f1f5f9",
                borderRadius: "12px",
                padding: "18px",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  fontWeight: "700",
                  fontSize: "15px",
                  marginBottom: "6px",
                }}
              >
                Q: {item.q}
              </div>
              <div style={{ fontSize: "14px", color: "#334155" }}>
                {item.a.includes("Verified Buyer") ? (
                  <>
                    A: I use them on daily walks and find them comfortable. —{" "}
                    <span style={{ color: "#16a34a", fontWeight: "700" }}>
                      Verified Buyer ✓
                    </span>
                  </>
                ) : (
                  item.a
                )}
              </div>
            </div>
          ))}

          <form onSubmit={handlePostQuestion}>
            <label
              style={{
                display: "block",
                fontWeight: "700",
                fontSize: "16px",
                marginBottom: "12px",
              }}
            >
              Ask a question about this product
            </label>
            <input
              type="text"
              value={newQuestionText}
              onChange={(e) => setNewQuestionText(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 16px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "15px",
                marginBottom: "20px",
                boxSizing: "border-box",
              }}
            />

            <div style={{ display: "flex", gap: "12px" }}>
              <button type="submit" style={styles.yellowBtn}>
                Submit question
              </button>
              <button
                type="button"
                style={styles.grayBtn}
                onClick={() => setCurrentView("details")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        <div style={styles.card}>
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "700",
              marginBottom: "18px",
            }}
          >
            Verified buyer Q&A
          </h3>
          <ul
            style={{
              paddingLeft: "20px",
              color: "#334155",
              fontSize: "14px",
              lineHeight: "1.8",
              margin: "0 0 24px 0",
            }}
          >
            <li>Only verified purchasers of this product can post replies.</li>
            <li>All shoppers can ask a product question.</li>
            <li>Responses display a verified-purchase badge.</li>
            <li>Replies are not instant.</li>
            <li>Messages are not live chat.</li>
          </ul>

          <button
            style={{
              ...styles.grayBtn,
              width: "100%",
              cursor: "not-allowed",
              color: "#64748b",
            }}
            disabled
          >
            🔒 Reply — verified purchasers only
          </button>
        </div>
      </div>
    </div>
  );
}
