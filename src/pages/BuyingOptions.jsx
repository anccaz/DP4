
import { useState } from "react";
import { styles } from "../styles/styles";

export default function BuyingOptions({ selectedProduct, setCurrentView }) {
  const hasPickup = selectedProduct.availability
    .toLowerCase()
    .includes("local pickup");

  const hasDelivery =
    selectedProduct.availability.toLowerCase().includes("online") ||
    Boolean(selectedProduct.shipping);

  const [selectedOption, setSelectedOption] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  const price = selectedProduct.price;
  const shipping = selectedProduct.shipping
    .toLowerCase()
    .includes("free")
    ? 0
    : 5; // Placeholder for shipping costs not specified in catalog

  const options = [
    {
      id: "pickup",
      title: "Local Pickup",
      description: "Pick up your order at a nearby store.",
      available: hasPickup,
      total: price,
    },
    {
      id: "delivery",
      title: "Online Delivery",
      description: "Have your order delivered to your address.",
      available: hasDelivery,
      total: price + shipping,
    },
  ];

  return (
    <div>
      <span style={styles.subLabel}>Buying Options</span>
      <h1 style={styles.pageHeading}>
        Choose how to receive your product
      </h1>

      <div style={{ ...styles.card, marginBottom: "24px" }}>
        <h2>{selectedProduct.name}</h2>
        <p>Sold by {selectedProduct.store}</p>
        <h2>${price.toFixed(2)}</h2>
        <p>Product price before tax</p>
      </div>

      {!confirmed ? (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "20px",
            }}
          >
            {options.map((option) => (
              <button
                key={option.id}
                type="button"
                disabled={!option.available || !selectedProduct.inStock}
                onClick={() => setSelectedOption(option.id)}
                aria-pressed={selectedOption === option.id}
                style={{
                  ...styles.card,
                  textAlign: "left",
                  cursor: option.available ? "pointer" : "not-allowed",
                  border:
                    selectedOption === option.id
                      ? "3px solid #1e293b"
                      : "1px solid #e2e8f0",
                  opacity: option.available ? 1 : 0.6,
                }}
              >
                <h2>{option.title}</h2>
                <p>{option.description}</p>
                <p>
                  {option.available
                    ? "Available"
                    : "Not available for this product"}
                </p>
                <h2>${option.total.toFixed(2)}</h2>
                <p>Total before tax</p>
                {selectedOption === option.id && (
                  <strong>✓ Selected</strong>
                )}
              </button>
            ))}
          </div>

          <div style={{ marginTop: "24px" }}>
            <button
              style={styles.yellowBtn}
              disabled={!selectedOption}
              onClick={() => setConfirmed(true)}
            >
              Continue with selected option
            </button>
          </div>
        </>
      ) : (
        <div style={styles.card} role="status">
          <h2>Option selected successfully</h2>
          <p>
            You selected{" "}
            {selectedOption === "pickup"
              ? "Local Pickup"
              : "Online Delivery"}.
          </p>
          <p>No order has been placed.</p>
          <button
            style={styles.grayBtn}
            onClick={() => setConfirmed(false)}
          >
            Change selection
          </button>
        </div>
      )}

      <div style={{ marginTop: "24px" }}>
        <button
          style={styles.outlineBtn}
          onClick={() => setCurrentView("details")}
        >
          ← Back to Product
        </button>
      </div>
    </div>
  );
}
