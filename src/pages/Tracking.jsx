import { styles } from "../styles/styles";

export default function Tracking({ setCurrentView }) {
  return (
    <div>
      <span style={styles.subLabel}>Delivery Progress</span>
      <h1 style={styles.pageHeading}>Track Delivery</h1>

      <div style={styles.card}>
        <h3
          style={{ fontSize: "20px", fontWeight: "700", marginBottom: "6px" }}
        >
          Comfort Walking Shoes
        </h3>
        <div
          style={{ color: "#64748b", fontSize: "14px", marginBottom: "24px" }}
        >
          Order #1042 • Tracking ID: TRK-98234710-SH
        </div>

        {/* Progress Milestones */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            position: "relative",
            margin: "40px 0",
          }}
        >
          <div style={{ textAlign: "center", zIndex: 1 }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: "#16a34a",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 8px auto",
                fontWeight: "bold",
              }}
            >
              ✓
            </div>
            <div style={{ fontSize: "14px", fontWeight: "600" }}>
              Order Placed
            </div>
            <div style={{ fontSize: "12px", color: "#64748b" }}>Oct 7</div>
          </div>
          <div style={{ textAlign: "center", zIndex: 1 }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: "#16a34a",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 8px auto",
                fontWeight: "bold",
              }}
            >
              ✓
            </div>
            <div style={{ fontSize: "14px", fontWeight: "600" }}>Shipped</div>
            <div style={{ fontSize: "12px", color: "#64748b" }}>Oct 8</div>
          </div>
          <div style={{ textAlign: "center", zIndex: 1 }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: "#16a34a",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 8px auto",
                fontWeight: "bold",
              }}
            >
              ✓
            </div>
            <div style={{ fontSize: "14px", fontWeight: "600" }}>
              Out for Delivery
            </div>
            <div style={{ fontSize: "12px", color: "#64748b" }}>Oct 10</div>
          </div>
          <div style={{ textAlign: "center", zIndex: 1 }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: "#16a34a",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 8px auto",
                fontWeight: "bold",
              }}
            >
              ✓
            </div>
            <div style={{ fontSize: "14px", fontWeight: "600" }}>Delivered</div>
            <div style={{ fontSize: "12px", color: "#64748b" }}>
              Oct 10, 2:15 PM
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
          <button
            style={styles.yellowBtn}
            onClick={() => setCurrentView("return")}
          >
            Start a return
          </button>
          <button
            style={styles.outlineBtn}
            onClick={() => setCurrentView("orders")}
          >
            Back to My Orders
          </button>
        </div>
      </div>
    </div>
  );
}
