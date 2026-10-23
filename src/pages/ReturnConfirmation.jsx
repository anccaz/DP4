import { styles } from "../styles/styles";

export default function ReturnConfirmation({
  selectedReturnMethod,
  setCurrentView,
}) {
  return (
    <div>
      <h1 style={styles.pageHeading}>Return label ready</h1>

      <div style={{ ...styles.card, maxWidth: "640px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#16a34a",
            fontSize: "18px",
            fontWeight: "700",
            marginBottom: "16px",
          }}
        >
          <span>✓</span>
          <span>Return authorized for Order #1042</span>
        </div>

        <div
          style={{
            border: "2px dashed #94a3b8",
            borderRadius: "10px",
            padding: "24px",
            backgroundColor: "#f8fafc",
            marginBottom: "24px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontWeight: "800",
              letterSpacing: "2px",
              fontSize: "16px",
              marginBottom: "4px",
            }}
          >
            SHOPPING HUB RMA RETURN
          </div>
          <div
            style={{
              fontSize: "12px",
              color: "#64748b",
              marginBottom: "16px",
            }}
          >
            RMA# 99482-RET-2026
          </div>

          <div
            style={{
              width: "220px",
              height: "50px",
              margin: "0 auto 12px auto",
              background:
                "repeating-linear-gradient(90deg, #000, #000 3px, #fff 3px, #fff 6px, #000 6px, #000 10px, #fff 10px, #fff 12px)",
            }}
          ></div>
          <div
            style={{
              fontFamily: "monospace",
              letterSpacing: "3px",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            *1042-99482*
          </div>
          <div
            style={{
              fontSize: "12px",
              color: "#64748b",
              marginTop: "8px",
            }}
          >
            Method:{" "}
            {selectedReturnMethod === "drop-off"
              ? "Store Drop-off"
              : "Prepaid Carrier Pick-up"}
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <button style={styles.yellowBtn} onClick={() => window.print()}>
            Print return label
          </button>
          <button
            style={styles.grayBtn}
            onClick={() => setCurrentView("orders")}
          >
            Back to My Orders
          </button>
        </div>
      </div>
    </div>
  );
}
