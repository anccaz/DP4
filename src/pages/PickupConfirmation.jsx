
import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { styles } from "../styles/styles";
import "./PickupConfirmation.css";

export default function PickupConfirmation({
  selectedProduct,
  setCurrentView,
}) {
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [qrError, setQrError] = useState(false);

  // Fixed demo reference for prototype testing.
  const pickupReference = `DEMO-${selectedProduct.id}`;

  useEffect(() => {
    let cancelled = false;

    QRCode.toDataURL(
      `SHOPPING HUB DEMO\nReference: ${pickupReference}\nProduct: ${selectedProduct.name}\nNot valid for pickup`,
      {
        width: 240,
        margin: 2,
        errorCorrectionLevel: "M",
      }
    )
      .then((url) => {
        if (!cancelled) {
          setQrCodeUrl(url);
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
  }, [pickupReference, selectedProduct.name]);

  const formatPrice = (amount) => `$${amount.toFixed(2)}`;

  return (
    <div>
      <div className="pickup-no-print">
        <span style={styles.subLabel}>Local Pickup</span>

        <h1 style={styles.pageHeading}>
          Pickup Confirmation
        </h1>

        <p style={{ fontSize: "17px", color: "#475569" }}>
          Print this demonstration confirmation or save it as a PDF.
        </p>
      </div>

      <section
        className="pickup-receipt"
        style={{
          ...styles.card,
          maxWidth: "680px",
          margin: "24px auto",
          textAlign: "center",
        }}
      >
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "28px", marginBottom: "8px" }}>
            Shopping Hub
          </h2>

          <strong style={{ color: "#b45309" }}>
            DEMONSTRATION ONLY
          </strong>

          <h3 style={{ fontSize: "23px", marginTop: "24px" }}>
            Local Pickup Confirmation
          </h3>
        </div>

        <div style={{ marginBottom: "24px" }}>
          {qrCodeUrl ? (
            <img
              src={qrCodeUrl}
              alt={`Demo pickup QR code for reference ${pickupReference}`}
              width="240"
              height="240"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          ) : (
            <p role="status">
              {qrError
                ? "QR code could not be generated."
                : "Generating QR code..."}
            </p>
          )}

          <p style={{ fontSize: "18px", fontWeight: "700" }}>
            {pickupReference}
          </p>

          <p style={{ fontSize: "14px", color: "#64748b" }}>
            Sample reference number
          </p>
        </div>

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
            <strong>Product:</strong> {selectedProduct.name}
          </p>

          <p>
            <strong>Store:</strong> {selectedProduct.store}
          </p>

          <p>
            <strong>Pickup location:</strong> Not specified
          </p>

          <p>
            <strong>Pickup time:</strong> Not confirmed
          </p>

          <p>
            <strong>Pickup fee:</strong> Free
          </p>

          <p>
            <strong>Total before tax:</strong>{" "}
            {formatPrice(selectedProduct.price)}
          </p>
        </div>

        <div
          style={{
            backgroundColor: "#f1f5f9",
            padding: "16px",
            borderRadius: "8px",
            marginTop: "24px",
            fontSize: "15px",
            lineHeight: "1.6",
            textAlign: "left",
          }}
        >
          <strong>Important:</strong> This is a prototype demonstration.
          No purchase, payment, reservation, or store pickup has been
          completed. This QR code cannot be redeemed at a real store.
        </div>
      </section>

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
          style={styles.yellowBtn}
          disabled={!qrCodeUrl}
          onClick={() => window.print()}
        >
          Print / Save as PDF
        </button>

        <button
          type="button"
          style={styles.grayBtn}
          onClick={() => setCurrentView("buyingOptions")}
        >
          Back to Buying Options
        </button>
      </div>
    </div>
  );
}
