
import { styles } from "../styles/styles";

export default function ReturnConfirmation({
  order,
  setCurrentView,
}) {
  if (!order?.returnInitiated) {
    return (
      <div>
        <h1 style={styles.pageHeading}>Return Not Found</h1>
        <p>No return request was found.</p>
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

  const returnReference =
    order.returnReference || `RET-${order.id}`;

  const method = order.returnMethod || "Not specified";

  const requestedDate = order.returnRequestedAt
    ? new Date(order.returnRequestedAt).toLocaleDateString()
    : "Not available";

  return (
    <div>
      <span style={styles.subLabel}>Returns & Refunds</span>
      <h1 style={styles.pageHeading}>
        Return Request Confirmed
      </h1>

      <div style={{ ...styles.card, maxWidth: "640px" }}>
        <div
          role="status"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#15803d",
            fontSize: "18px",
            fontWeight: "700",
            marginBottom: "16px",
          }}
        >
          <span aria-hidden="true">✓</span>
          <span>Return requested for Order {order.id}</span>
        </div>

        <p
          style={{
            fontSize: "15px",
            color: "#475569",
            marginBottom: "24px",
          }}
        >
          Your return request has been saved.
          Keep the reference below for your records.
        </p>

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
              marginBottom: "8px",
            }}
          >
            SHOPPING HUB
          </div>

          <h2
            style={{
              fontSize: "20px",
              margin: "8px 0 20px",
            }}
          >
            Return Slip
          </h2>

          <div
            style={{
              backgroundColor: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "20px",
            }}
          >
            <p
              style={{
                fontSize: "13px",
                color: "#64748b",
                margin: "0 0 8px",
              }}
            >
              Return Reference
            </p>

            <strong
              style={{
                fontSize: "18px",
                overflowWrap: "anywhere",
              }}
            >
              {returnReference}
            </strong>
          </div>

          <div
            style={{
              textAlign: "left",
              lineHeight: "1.8",
              fontSize: "15px",
            }}
          >
            <p>
              <strong>Order Number:</strong> {order.id}
            </p>

            <p>
              <strong>Product:</strong> {order.productName}
            </p>

            <p>
              <strong>Store:</strong> {order.store}
            </p>

            <p>
              <strong>Return Method:</strong> {method}
            </p>

            <p>
              <strong>Requested:</strong> {requestedDate}
            </p>

            <p>
              <strong>Return Status:</strong> Requested
            </p>
          </div>

          <p
            style={{
              marginTop: "20px",
              fontSize: "13px",
              color: "#64748b",
              lineHeight: "1.6",
            }}
          >
            This slip records your return request.
            It is not a carrier shipping label or
            proof that a refund has been issued.
          </p>
        </div>

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
            onClick={() => window.print()}
          >
            Print Return Slip
          </button>

          <button
            type="button"
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
