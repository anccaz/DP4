
import { useState } from "react";
import { styles } from "../styles/styles";

export default function Orders({
  orders,
  setCurrentView,
  onCancelOrder,
  onMarkDelivered,
  onStartReturn,
  onViewReturn,
}) {
  const [filter, setFilter] = useState("all");
  const [cancelTarget, setCancelTarget] = useState(null);

  const formatPrice = (amount) =>
    typeof amount === "number"
      ? `$${amount.toFixed(2)}`
      : "Not yet calculated";

  const filteredOrders = orders.filter((order) => {
    if (filter === "delivered") {
      return order.status === "Delivered";
    }

    if (filter === "active") {
      return (
        order.status !== "Delivered" &&
        order.status !== "Cancelled"
      );
    }

    return true;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "#15803d";
      case "Pending Pickup":
        return "#92400e";
      case "Pending Delivery":
        return "#1d4ed8";
      case "Cancelled":
        return "#64748b";
      default:
        return "#475569";
    }
  };

  const handleConfirmCancellation = () => {
    if (!cancelTarget) return;
    onCancelOrder(cancelTarget.id);
    setCancelTarget(null);
  };

  return (
    <div>
      <span style={styles.subLabel}>Order history</span>
      <h1 style={styles.pageHeading}>My Orders</h1>

      <p
        style={{
          color: "#64748b",
          fontSize: "16px",
          marginTop: "-20px",
          marginBottom: "24px",
        }}
      >
        View your orders, check their status, and manage
        your purchases.
      </p>

      <div style={styles.card}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <h2 style={{ fontSize: "20px", margin: 0 }}>
            Your Orders
          </h2>

          <div
            role="group"
            aria-label="Filter orders"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            {[
              { id: "all", label: "All Orders" },
              { id: "active", label: "Active" },
              { id: "delivered", label: "Delivered" },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={filter === item.id}
                style={{
                  ...styles.grayBtn,
                  fontSize: "14px",
                  backgroundColor:
                    filter === item.id
                      ? "#fde68a"
                      : "#eef2f6",
                  border:
                    filter === item.id
                      ? "2px solid #d99915"
                      : "2px solid transparent",
                }}
                onClick={() => setFilter(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <p
            style={{
              color: "#64748b",
              padding: "24px",
              textAlign: "center",
            }}
          >
            No orders found.
          </p>
        ) : (
          filteredOrders.map((order) => {
            const isPending = [
              "Pending Delivery",
              "Pending Pickup",
            ].includes(order.status);

            const canCancel = order.isDemo && isPending;
            const canMarkDelivered = order.isDemo && isPending;

            const canReturn =
              order.status === "Delivered" &&
              !order.returnInitiated;

            const hasReturn = Boolean(order.returnInitiated);

            return (
              <article
                key={order.id}
                style={{
                  backgroundColor: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px",
                  padding: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "20px",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    alignItems: "center",
                    flex: "1 1 300px",
                  }}
                >
                  <div
                    aria-hidden="true"
                    style={{
                      width: "90px",
                      height: "90px",
                      backgroundColor: "#ffffff",
                      border: "1px solid #e2e8f0",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      fontWeight: "700",
                      color: "#64748b",
                      flexShrink: 0,
                    }}
                  >
                    PRODUCT
                  </div>

                  <div>
                    <h3
                      style={{
                        fontSize: "19px",
                        fontWeight: "700",
                        margin: "0 0 8px",
                      }}
                    >
                      {order.productName}
                    </h3>

                    <p
                      style={{
                        fontSize: "14px",
                        color: "#64748b",
                        margin: "0 0 8px",
                        overflowWrap: "anywhere",
                      }}
                    >
                      Order {order.id} • {order.store}
                    </p>

                    <p
                      style={{
                        fontSize: "16px",
                        fontWeight: "700",
                        color: getStatusColor(order.status),
                        margin: "0 0 8px",
                      }}
                    >
                      Status: {order.status}
                    </p>

                    {order.isDemo ? (
                      <>
                        <p
                          style={{
                            fontSize: "14px",
                            margin: "0 0 8px",
                          }}
                        >
                          Fulfillment:{" "}
                          {order.method === "pickup"
                            ? "Local Pickup"
                            : "Online Delivery"}
                        </p>

                        <p
                          style={{
                            fontSize: "14px",
                            margin: "0 0 8px",
                          }}
                        >
                          Order Date:{" "}
                          {order.createdAt
                            ? new Date(
                                order.createdAt
                              ).toLocaleDateString()
                            : "Not available"}
                        </p>

                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            margin: 0,
                          }}
                        >
                          {order.totalPaid === null
                            ? "Subtotal"
                            : "Total Before Tax"}
                          :{" "}
                          {formatPrice(
                            order.totalPaid ?? order.itemPrice
                          )}
                        </p>

                        {order.totalPaid === null && (
                          <p
                            style={{
                              color: "#64748b",
                              fontSize: "13px",
                              marginTop: "6px",
                            }}
                          >
                            Shipping and tax not included.
                          </p>
                        )}

                        {order.deliveryDate && (
                          <p
                            style={{
                              color: "#15803d",
                              fontSize: "13px",
                              marginTop: "8px",
                            }}
                          >
                            {order.deliveryDate}
                          </p>
                        )}
                      </>
                    ) : (
                      <>
                        <p
                          style={{
                            fontSize: "14px",
                            margin: "0 0 8px",
                          }}
                        >
                          {order.deliveryDate}
                        </p>

                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            margin: 0,
                          }}
                        >
                          Total Paid: {formatPrice(order.totalPaid)}
                        </p>
                      </>
                    )}

                    {hasReturn && (
                      <div
                        style={{
                          marginTop: "12px",
                          padding: "10px",
                          backgroundColor: "#fffbeb",
                          border: "1px solid #fde68a",
                          borderRadius: "8px",
                        }}
                      >
                        <p
                          style={{
                            color: "#92400e",
                            fontSize: "14px",
                            fontWeight: "700",
                            margin: "0 0 5px",
                          }}
                        >
                          Return Requested
                        </p>

                        <p
                          style={{
                            color: "#475569",
                            fontSize: "13px",
                            margin: 0,
                          }}
                        >
                          Method: {order.returnMethod}
                        </p>

                        {order.returnReference && (
                          <p
                            style={{
                              color: "#475569",
                              fontSize: "13px",
                              margin: "5px 0 0",
                              overflowWrap: "anywhere",
                            }}
                          >
                            Reference: {order.returnReference}
                          </p>
                        )}
                      </div>
                    )}

                    {order.status === "Cancelled" && (
                      <p
                        style={{
                          fontSize: "13px",
                          color: "#64748b",
                        }}
                      >
                        This order is not eligible for return.
                      </p>
                    )}

                    {isPending && (
                      <p
                        style={{
                          fontSize: "13px",
                          color: "#64748b",
                          marginTop: "10px",
                        }}
                      >
                        Returns become available after delivery.
                      </p>
                    )}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    minWidth: "170px",
                  }}
                >
                  {canReturn && (
                    <button
                      type="button"
                      style={styles.yellowBtn}
                      onClick={() => onStartReturn(order.id)}
                    >
                      Return Purchase
                    </button>
                  )}

                  {hasReturn && (
                    <button
                      type="button"
                      style={styles.yellowBtn}
                      onClick={() => onViewReturn(order.id)}
                    >
                      View Return Slip
                    </button>
                  )}

                  {canMarkDelivered && (
                    <button
                      type="button"
                      style={styles.outlineBtn}
                      onClick={() => onMarkDelivered(order.id)}
                    >
                      Mark as Delivered
                    </button>
                  )}

                  {canCancel && (
                    <button
                      type="button"
                      style={{
                        ...styles.grayBtn,
                        color: "#b91c1c",
                        border: "1px solid #fca5a5",
                      }}
                      onClick={() => setCancelTarget(order)}
                    >
                      Cancel Order
                    </button>
                  )}

                  {!order.isDemo && (
                    <button
                      type="button"
                      style={styles.grayBtn}
                      onClick={() => setCurrentView("track")}
                    >
                      Track Delivery
                    </button>
                  )}

                  {order.status === "Cancelled" && (
                    <span
                      style={{
                        color: "#64748b",
                        fontSize: "14px",
                        fontWeight: "600",
                        textAlign: "center",
                      }}
                    >
                      Order Cancelled
                    </span>
                  )}
                </div>
              </article>
            );
          })
        )}

        {cancelTarget && (
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="cancel-order-title"
            aria-describedby="cancel-order-description"
            style={{
              border: "2px solid #fca5a5",
              borderRadius: "12px",
              backgroundColor: "#fff7f7",
              padding: "24px",
              marginBottom: "24px",
            }}
          >
            <h2
              id="cancel-order-title"
              style={{ marginTop: 0 }}
            >
              Cancel this order?
            </h2>

            <p id="cancel-order-description">
              Are you sure you want to cancel the order for{" "}
              <strong>{cancelTarget.productName}</strong>?
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
                style={{
                  ...styles.grayBtn,
                  backgroundColor: "#fee2e2",
                  color: "#991b1b",
                }}
                onClick={handleConfirmCancellation}
              >
                Yes, Cancel Order
              </button>

              <button
                type="button"
                style={styles.yellowBtn}
                onClick={() => setCancelTarget(null)}
              >
                Keep Order
              </button>
            </div>
          </div>
        )}

        <button
          type="button"
          style={styles.outlineBtn}
          onClick={() => setCurrentView("home")}
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
}
