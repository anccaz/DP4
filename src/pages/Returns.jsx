
import { styles } from "../styles/styles";

export default function Returns({
  order,
  selectedReturnMethod,
  setSelectedReturnMethod,
  handleConfirmReturn,
  setCurrentView,
}) {
  const eligible =
    order?.status === "Delivered" &&
    !order?.returnInitiated;

  const price =
    typeof order?.totalPaid === "number"
      ? `$${order.totalPaid.toFixed(2)}`
      : typeof order?.itemPrice === "number"
        ? `$${order.itemPrice.toFixed(2)}`
        : "Not available";

  if (!order) {
    return (
      <div>
        <h1 style={styles.pageHeading}>Start a Return</h1>
        <p>No order selected.</p>
        <button
          type="button"
          style={styles.outlineBtn}
          onClick={() => setCurrentView("orders")}
        >
          Back to My Orders
        </button>
      </div>
    );
  }

  return (
    <div>
      <span style={styles.subLabel}>Returns & Refunds</span>
      <h1 style={styles.pageHeading}>Start a Return</h1>

      <div style={{ ...styles.card, maxWidth: "680px" }}>
        <h3
          style={{
            fontSize: "20px",
            fontWeight: "700",
            marginBottom: "8px",
          }}
        >
          Return for Order {order.id}
        </h3>

        <div
          style={{
            backgroundColor: "#f8fafc",
            padding: "16px",
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
            marginBottom: "24px",
          }}
        >
          <p style={{ margin: "0 0 8px" }}>
            <strong>Product:</strong> {order.productName}
          </p>
          <p style={{ margin: "0 0 8px" }}>
            <strong>Store:</strong> {order.store}
          </p>
          <p style={{ margin: "0 0 8px" }}>
            <strong>Purchase amount:</strong> {price}
          </p>
          <p style={{ margin: 0 }}>
            <strong>Order status:</strong> {order.status}
          </p>
        </div>

        {!eligible ? (
          <>
            <p
              role="alert"
              style={{
                padding: "14px",
                borderRadius: "8px",
                backgroundColor: "#fef2f2",
                color: "#991b1b",
              }}
            >
              This order is not eligible for a new return.
              Only delivered orders without an existing
              return request can be returned.
            </p>

            <button
              type="button"
              style={styles.outlineBtn}
              onClick={() => setCurrentView("orders")}
            >
              Back to My Orders
            </button>
          </>
        ) : (
          <>
            <h3
              style={{
                fontSize: "18px",
                marginBottom: "16px",
              }}
            >
              Choose a return method
            </h3>

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
                  onChange={() =>
                    setSelectedReturnMethod("drop-off")
                  }
                  style={{ marginTop: "3px" }}
                />
                <div>
                  <div
                    style={{
                      fontWeight: "700",
                      fontSize: "15px",
                    }}
                  >
                    Drop-off at local store
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#64748b",
                      marginTop: "6px",
                    }}
                  >
                    Receive a return slip with your
                    order information and return reference.
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
                  onChange={() =>
                    setSelectedReturnMethod("pickup")
                  }
                  style={{ marginTop: "3px" }}
                />
                <div>
                  <div
                    style={{
                      fontWeight: "700",
                      fontSize: "15px",
                    }}
                  >
                    Carrier Pickup
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#64748b",
                      marginTop: "6px",
                    }}
                  >
                    Save a return request with carrier
                    pickup as the preferred method.
                  </div>
                </div>
              </label>
            </div>

            <p
              style={{
                fontSize: "13px",
                color: "#64748b",
                marginBottom: "20px",
              }}
            >
              Your request will be saved to your order
              history. Shipping labels, pickups, and
              refunds are not processed through this page.
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              <button
                type="button"
                style={styles.yellowBtn}
                onClick={handleConfirmReturn}
              >
                Confirm Return Request
              </button>

              <button
                type="button"
                style={styles.grayBtn}
                onClick={() => setCurrentView("orders")}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
