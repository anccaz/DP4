import { styles } from "../styles/styles";

export default function Orders({ orders, setCurrentView }) {
  return (
    <div>
      <span style={styles.subLabel}>Order history</span>
      <h1 style={styles.pageHeading}>My Orders</h1>
      <p
        style={{
          color: "#64748b",
          fontSize: "15px",
          marginTop: "-20px",
          marginBottom: "24px",
        }}
      >
        All your participating-store purchases in one place.
      </p>

      <div style={styles.card}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "24px",
          }}
        >
          <span style={{ fontSize: "18px", fontWeight: "700" }}>
            Your purchases
          </span>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              style={{
                ...styles.grayBtn,
                padding: "8px 16px",
                fontSize: "14px",
              }}
            >
              All orders
            </button>
            <button
              style={{
                ...styles.grayBtn,
                padding: "8px 16px",
                fontSize: "14px",
                backgroundColor: "#e2e8f0",
              }}
            >
              Delivered
            </button>
          </div>
        </div>

        {orders.map((ord) => (
          <div
            key={ord.id}
            style={{
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              padding: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "24px",
            }}
          >
            <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
              <div
                style={{
                  width: "90px",
                  height: "90px",
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "11px",
                  fontWeight: "700",
                  color: "#64748b",
                }}
              >
                PRODUCT
              </div>
              <div>
                <h4
                  style={{
                    margin: "0 0 4px 0",
                    fontSize: "18px",
                    fontWeight: "700",
                  }}
                >
                  {ord.productName}
                </h4>
                <div
                  style={{
                    fontSize: "14px",
                    color: "#64748b",
                    marginBottom: "6px",
                  }}
                >
                  Order {ord.id} • {ord.store}
                </div>
                <div
                  style={{
                    color: "#16a34a",
                    fontWeight: "700",
                    fontSize: "14px",
                    marginBottom: "6px",
                  }}
                >
                  {ord.deliveryDate}
                </div>
                <div style={{ fontSize: "14px", fontWeight: "600" }}>
                  Total paid: ${ord.totalPaid.toFixed(2)}
                </div>
                {ord.returnInitiated && (
                  <div
                    style={{
                      marginTop: "8px",
                      color: "#ea580c",
                      fontSize: "13px",
                      fontWeight: "600",
                    }}
                  >
                    Return status: {ord.returnMethod} requested
                  </div>
                )}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                minWidth: "160px",
              }}
            >
              <button
                style={styles.yellowBtn}
                onClick={() => setCurrentView("return")}
              >
                {ord.returnInitiated ? "View return slip" : "Return purchase"}
              </button>
              <button
                style={styles.grayBtn}
                onClick={() => setCurrentView("track")}
              >
                Track delivery
              </button>
            </div>
          </div>
        ))}

        <button
          style={styles.outlineBtn}
          onClick={() => setCurrentView("home")}
        >
          ← Back to home
        </button>
      </div>
    </div>
  );
}
