import { styles } from "../styles/styles";

export default function Returns({
  selectedReturnMethod,
  setSelectedReturnMethod,
  handleConfirmReturn,
  setCurrentView,
}) {
  return (
    <div>
      <span style={styles.subLabel}>Returns & Refunds</span>
      <h1 style={styles.pageHeading}>Start a Return</h1>

      <div style={{ ...styles.card, maxWidth: "680px" }}>
        <h3
          style={{ fontSize: "20px", fontWeight: "700", marginBottom: "8px" }}
        >
          Select return method for Order #1042
        </h3>
        <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "24px" }}>
          Item: Comfort Walking Shoes ($59.99)
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            marginBottom: "28px",
          }}
        >
          <label
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
              padding: "16px",
              borderRadius: "8px",
              border:
                selectedReturnMethod === "drop-off"
                  ? "2px solid #fab633"
                  : "1px solid #cbd5e1",
              cursor: "pointer",
            }}
          >
            <input
              type="radio"
              name="returnMethod"
              value="drop-off"
              checked={selectedReturnMethod === "drop-off"}
              onChange={() => setSelectedReturnMethod("drop-off")}
              style={{ marginTop: "3px" }}
            />
            <div>
              <div style={{ fontWeight: "700", fontSize: "15px" }}>
                Drop-off at local store (Immediate Refund)
              </div>
              <div style={{ fontSize: "13px", color: "#64748b" }}>
                Bring barcode label to any participating Sample Store location.
              </div>
            </div>
          </label>

          <label
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
              padding: "16px",
              borderRadius: "8px",
              border:
                selectedReturnMethod === "pickup"
                  ? "2px solid #fab633"
                  : "1px solid #cbd5e1",
              cursor: "pointer",
            }}
          >
            <input
              type="radio"
              name="returnMethod"
              value="pickup"
              checked={selectedReturnMethod === "pickup"}
              onChange={() => setSelectedReturnMethod("pickup")}
              style={{ marginTop: "3px" }}
            />
            <div>
              <div style={{ fontWeight: "700", fontSize: "15px" }}>
                Carrier Pickup (Printable Shipping Label)
              </div>
              <div style={{ fontSize: "13px", color: "#64748b" }}>
                A prepaid return shipping label will be generated for courier
                pickup.
              </div>
            </div>
          </label>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <button style={styles.yellowBtn} onClick={handleConfirmReturn}>
            Generate return label
          </button>
          <button
            style={styles.grayBtn}
            onClick={() => setCurrentView("orders")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
