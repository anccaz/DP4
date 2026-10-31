
import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { styles } from "../styles/styles";
import "./OrderConfirmation.css";

export default function OrderConfirmation({
  selectedProduct,
  order,
  method = "pickup",
  setCurrentView,
  onCancel,
}) {
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [qrError, setQrError] = useState(false);
  const [showCancelPrompt, setShowCancelPrompt] = useState(false);

  const isPickup = method === "pickup";
  const pickupStore = order.pickupStore;

  const title = isPickup
    ? "Local Pickup Confirmation"
    : "Online Delivery Confirmation";

  const reference = order.id;

  const formatPrice = (amount) =>
    `$${amount.toFixed(2)}`;

  const productPrice = order.itemPrice ?? selectedProduct.price;

  const shippingCost = isPickup
    ? 0
    : order.shippingCost ?? null;

  const total =
    shippingCost === null
      ? null
      : productPrice + shippingCost;

  // Generate the pickup QR code using order information.
  useEffect(() => {
    if (!isPickup) return;

    let cancelled = false;

    QRCode.toDataURL(
      JSON.stringify({
        orderId: reference,
        productId: selectedProduct.id,
        fulfillment: "pickup",
        storeId: pickupStore?.id ?? null,
      }),
      {
        width: 240,
        margin: 2,
        errorCorrectionLevel: "M",
      }
    )
      .then((url) => {
        if (!cancelled) {
          setQrCodeUrl(url);
          setQrError(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setQrError(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [
    isPickup,
    reference,
    selectedProduct.id,
    pickupStore?.id,
  ]);

  const handlePrint = () => {
    window.print();
  };

  const handleCancelOrder = () => {
    onCancel();
    setShowCancelPrompt(false);
  };

  const canPrint = !isPickup || Boolean(qrCodeUrl);

  return (
    <div>
      {/* Screen heading */}
      <div className="pickup-no-print">
        <span style={styles.subLabel}>
          {isPickup ? "Local Pickup" : "Online Delivery"}
        </span>

        <h1 style={styles.pageHeading}>
          {title}
        </h1>

        <p
          style={{
            fontSize: "17px",
            color: "#475569",
          }}
        >
          Review your order details below. You can print
          or save a copy for your records.
        </p>
      </div>

      {/* Printable receipt */}
      <section
        className="pickup-receipt"
        style={{
          ...styles.card,
          maxWidth: "680px",
          margin: "24px auto",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "28px",
            marginBottom: "8px",
          }}
        >
          Shopping Hub
        </h2>

        <h3
          style={{
            fontSize: "23px",
            marginTop: "24px",
            marginBottom: "12px",
          }}
        >
          Order Confirmation
        </h3>

        {/* Current order status */}
        <div
          style={{
            backgroundColor: "#fef3c7",
            color: "#92400e",
            borderRadius: "8px",
            padding: "12px",
            fontSize: "17px",
            fontWeight: "700",
            marginBottom: "24px",
          }}
        >
          Status: {order.status}
        </div>

        {/* Pickup QR code */}
        {isPickup && (
          <div style={{ marginBottom: "24px" }}>
            <h3 style={{ fontSize: "20px" }}>
              Pickup QR Code
            </h3>

            {qrCodeUrl ? (
              <img
                src={qrCodeUrl}
                alt={`Pickup QR code for order ${reference}`}
                width="240"
                height="240"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
              />
            ) : (
              <p role="status">
                {qrError
                  ? "QR code is temporarily unavailable."
                  : "Generating QR code..."}
              </p>
            )}

            <p
              style={{
                fontSize: "16px",
                color: "#475569",
              }}
            >
              Bring this QR code when collecting your order.
            </p>
          </div>
        )}

        {/* Order number */}
        <div
          style={{
            backgroundColor: "#f1f5f9",
            padding: "18px",
            borderRadius: "10px",
            marginBottom: "24px",
          }}
        >
          <p
            style={{
              fontSize: "15px",
              color: "#475569",
              marginTop: 0,
            }}
          >
            Order Number
          </p>

          <strong
            style={{
              fontSize: "20px",
              overflowWrap: "anywhere",
            }}
          >
            {reference}
          </strong>
        </div>

        {/* Order and fulfillment details */}
        <div
          style={{
            textAlign: "left",
            borderTop: "1px solid #e2e8f0",
            paddingTop: "20px",
            lineHeight: "1.8",
            fontSize: "17px",
          }}
        >
          <p>
            <strong>Product:</strong>{" "}
            {selectedProduct.name}
          </p>

          <p>
            <strong>Sold By:</strong>{" "}
            {selectedProduct.store}
          </p>

          <p>
            <strong>Fulfillment Method:</strong>{" "}
            {isPickup ? "Local Pickup" : "Online Delivery"}
          </p>

          {isPickup ? (
            <>
              <div
                style={{
                  backgroundColor: "#f8fafc",
                  padding: "18px",
                  borderRadius: "10px",
                  border: "1px solid #e2e8f0",
                  margin: "20px 0",
                }}
              >
                <h3
                  style={{
                    marginTop: 0,
                    fontSize: "20px",
                  }}
                >
                  Pickup Location
                </h3>

                <p>
                  <strong>Store:</strong>{" "}
                  {pickupStore?.name ?? "Not selected"}
                </p>

                <p>
                  <strong>Area:</strong>{" "}
                  {pickupStore?.area ?? "Not available"}
                </p>

                <p>
                  <strong>Pickup Estimate:</strong>{" "}
                  {pickupStore?.pickupEstimate ??
                    "To be confirmed"}
                </p>

                <p>
                  <strong>Store Hours:</strong>{" "}
                  {pickupStore?.hours ?? "Not available"}
                </p>

                <p>
                  <strong>Pickup Fee:</strong> Free
                </p>
              </div>

              <p
                style={{
                  fontSize: "15px",
                  color: "#475569",
                }}
              >
                Please bring your pickup confirmation
                and QR code when visiting the store.
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>Delivery Address:</strong>{" "}
                Not provided
              </p>

              <p>
                <strong>Estimated Delivery:</strong>{" "}
                To be confirmed
              </p>
            </>
          )}

          <hr
            style={{
              border: "none",
              borderTop: "1px solid #e2e8f0",
              margin: "20px 0",
            }}
          />

          {/* Price breakdown */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "12px",
            }}
          >
            <span>Item Price</span>
            <strong>{formatPrice(productPrice)}</strong>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "12px",
            }}
          >
            <span>
              {isPickup ? "Pickup Fee" : "Shipping"}
            </span>

            <strong>
              {shippingCost === 0
                ? "Free"
                : shippingCost === null
                  ? "Not yet calculated"
                  : formatPrice(shippingCost)}
            </strong>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "12px",
              borderTop: "1px solid #e2e8f0",
              marginTop: "16px",
              paddingTop: "16px",
              fontSize: "21px",
              fontWeight: "700",
            }}
          >
            <span>
              {total === null
                ? "Subtotal"
                : "Total Before Tax"}
            </span>

            <span>
              {formatPrice(total ?? productPrice)}
            </span>
          </div>

          {total === null && (
            <p
              style={{
                fontSize: "14px",
                color: "#64748b",
              }}
            >
              Shipping and taxes have not been included.
            </p>
          )}
        </div>
      </section>

      {/* Actions hidden when printing */}
      <div
        className="pickup-no-print"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "12px",
          marginTop: "24px",
        }}
      >
        <button
          type="button"
          style={{
            ...styles.yellowBtn,
            opacity: canPrint ? 1 : 0.5,
          }}
          disabled={!canPrint}
          onClick={handlePrint}
        >
          Print / Save as PDF
        </button>

        <button
          type="button"
          style={styles.grayBtn}
          onClick={() => setCurrentView("orders")}
        >
          View My Orders
        </button>

        <button
          type="button"
          style={{
            ...styles.grayBtn,
            color: "#b91c1c",
            border: "1px solid #fca5a5",
          }}
          onClick={() => setShowCancelPrompt(true)}
        >
          Cancel Order
        </button>
      </div>

      {/* Cancellation confirmation */}
      {showCancelPrompt && (
        <div
          className="pickup-no-print"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="cancel-confirmation-title"
          style={{
            ...styles.card,
            maxWidth: "680px",
            margin: "24px auto",
            backgroundColor: "#fff7f7",
            border: "2px solid #fca5a5",
          }}
        >
          <h2
            id="cancel-confirmation-title"
            style={{ marginTop: 0 }}
          >
            Cancel this order?
          </h2>

          <p style={{ fontSize: "16px" }}>
            Are you sure you want to cancel order{" "}
            <strong>{reference}</strong>?
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
              onClick={handleCancelOrder}
            >
              Yes, Cancel Order
            </button>

            <button
              type="button"
              style={styles.yellowBtn}
              onClick={() => setShowCancelPrompt(false)}
            >
              Keep Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
