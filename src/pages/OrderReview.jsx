
import { styles } from "../styles/styles";

export default function OrderReview({
  selectedProduct,
  method,
  pickupStore,
  deliveryAddress,
  onBack,
  onConfirm,
}) {
  const isPickup = method === "pickup";

  const isFreeShipping = selectedProduct.shipping
    .toLowerCase()
    .includes("free");

  const shippingCost =
    isPickup || isFreeShipping ? 0 : null;

  const productPrice = selectedProduct.price;

  const knownTotal =
    shippingCost === null
      ? null
      : productPrice + shippingCost;

  const formatPrice = (amount) =>
    typeof amount === "number"
      ? `$${amount.toFixed(2)}`
      : "Not yet calculated";

  const canConfirm =
    selectedProduct.inStock &&
    (isPickup
      ? Boolean(pickupStore)
      : method === "delivery" &&
        Boolean(deliveryAddress?.fullName));

  return (
    <div>
      <span style={styles.subLabel}>Checkout</span>

      <h1 style={styles.pageHeading}>
        Review Your Order
      </h1>

      <p
        style={{
          fontSize: "17px",
          color: "#475569",
          lineHeight: "1.6",
          marginBottom: "28px",
        }}
      >
        Check your product, fulfillment information,
        and pricing before placing your order.
      </p>

      <div
        style={{
          ...styles.card,
          maxWidth: "760px",
          marginBottom: "20px",
        }}
      >
        <h2
          style={{
            fontSize: "22px",
            marginTop: 0,
          }}
        >
          Product Summary
        </h2>

        <h3
          style={{
            fontSize: "19px",
            marginBottom: "8px",
          }}
        >
          {selectedProduct.name}
        </h3>

        <p style={{ color: "#64748b" }}>
          Sold by {selectedProduct.store}
        </p>

        <p
          style={{
            fontSize: "22px",
            fontWeight: "800",
          }}
        >
          {formatPrice(productPrice)}
        </p>

        <p
          style={{
            fontSize: "14px",
            color: "#64748b",
          }}
        >
          Quantity: 1
        </p>
      </div>

      <div
        style={{
          ...styles.card,
          maxWidth: "760px",
          marginBottom: "20px",
        }}
      >
        <h2
          style={{
            fontSize: "22px",
            marginTop: 0,
          }}
        >
          Fulfillment Information
        </h2>

        <p>
          <strong>Method:</strong>{" "}
          {isPickup ? "Local Pickup" : "Online Delivery"}
        </p>

        {isPickup ? (
          <>
            <p>
              <strong>Pickup Store:</strong>{" "}
              {pickupStore?.name}
            </p>

            <p>
              <strong>Location:</strong>{" "}
              {pickupStore?.area}
            </p>

            <p>
              <strong>Pickup Estimate:</strong>{" "}
              {pickupStore?.pickupEstimate}
            </p>

            <p>
              <strong>Store Hours:</strong>{" "}
              {pickupStore?.hours}
            </p>
          </>
        ) : (
          <>
            <p>
              <strong>Recipient:</strong>{" "}
              {deliveryAddress?.fullName}
            </p>

            <p>
              <strong>Delivery Address:</strong>
            </p>

            <address
              style={{
                fontStyle: "normal",
                lineHeight: "1.7",
                marginLeft: "16px",
                color: "#334155",
              }}
            >
              {deliveryAddress?.street}
              {deliveryAddress?.apartment && (
                <>
                  {", "}
                  {deliveryAddress.apartment}
                </>
              )}
              <div>
                {deliveryAddress?.city},{" "}
                {deliveryAddress?.state}{" "}
                {deliveryAddress?.zip}
              </div>
            </address>

            <p
              style={{
                fontSize: "14px",
                color: "#64748b",
                marginTop: "16px",
              }}
            >
              Estimated delivery date: To be confirmed
            </p>
          </>
        )}
      </div>

      <div
        style={{
          ...styles.card,
          maxWidth: "760px",
          marginBottom: "20px",
        }}
      >
        <h2
          style={{
            fontSize: "22px",
            marginTop: 0,
          }}
        >
          Order Summary
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "12px",
            marginBottom: "14px",
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
            marginBottom: "14px",
          }}
        >
          <span>
            {isPickup ? "Pickup Fee" : "Shipping"}
          </span>

          <strong>
            {shippingCost === 0
              ? "Free"
              : formatPrice(shippingCost)}
          </strong>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "12px",
            paddingTop: "18px",
            borderTop: "1px solid #e2e8f0",
            fontSize: "21px",
            fontWeight: "800",
          }}
        >
          <span>
            {knownTotal === null
              ? "Subtotal"
              : "Total Before Tax"}
          </span>
          <span>
            {formatPrice(knownTotal ?? productPrice)}
          </span>
        </div>

        <p
          style={{
            color: "#64748b",
            fontSize: "14px",
            marginTop: "16px",
          }}
        >
          {shippingCost === null
            ? "Shipping and tax are not included in the subtotal. The final amount is not yet available."
            : "Tax has not been calculated. The amount shown is before tax."}
        </p>
      </div>

      <div
        style={{
          ...styles.card,
          maxWidth: "760px",
          border: "1px solid #e2e8f0",
        }}
      >
        <h2
          style={{
            fontSize: "20px",
            marginTop: 0,
          }}
        >
          Ready to place your order?
        </h2>

        <p
          style={{
            color: "#475569",
            lineHeight: "1.6",
            fontSize: "15px",
          }}
        >
          Select Place Order to save your purchase
          information and receive an order confirmation.
          No payment is collected through this checkout.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            marginTop: "24px",
          }}
        >
          <button
            type="button"
            style={{
              ...styles.yellowBtn,
              opacity: canConfirm ? 1 : 0.5,
              cursor: canConfirm
                ? "pointer"
                : "not-allowed",
            }}
            disabled={!canConfirm}
            onClick={onConfirm}
          >
            Place Order
          </button>

          <button
            type="button"
            style={styles.outlineBtn}
            onClick={onBack}
          >
            ← Edit Fulfillment Information
          </button>
        </div>
      </div>
    </div>
  );
}
