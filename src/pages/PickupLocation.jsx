
import { useState } from "react";
import { styles } from "../styles/styles";

// Predefined store options for the Shopping Hub prototype.
const PICKUP_STORES = [
  {
    id: "north-dallas",
    name: "Best Shoes — North Dallas",
    area: "North Dallas, TX",
    pickupEstimate: "Ready tomorrow",
    pickupDays: 1,
    hours: "Monday–Saturday, 9 AM–7 PM",
  },
  {
    id: "plano",
    name: "Best Shoes — Plano",
    area: "Plano, TX",
    pickupEstimate: "Ready in 2 days",
    pickupDays: 2,
    hours: "Monday–Saturday, 10 AM–6 PM",
  },
];

export default function PickupLocation({
  selectedProduct,
  onContinue,
  setCurrentView,
}) {
  const [selectedStoreId, setSelectedStoreId] = useState(null);

  const selectedStore = PICKUP_STORES.find(
    (store) => store.id === selectedStoreId
  );

  const formatPrice = (amount) => `$${amount.toFixed(2)}`;

  const handleContinue = () => {
    if (!selectedStore) return;

    onContinue({
      ...selectedStore,
      pickupDate: new Date(
        Date.now() + selectedStore.pickupDays * 86400000
      ).toISOString(),
    });
  };

  return (
    <div>
      <span style={styles.subLabel}>Local Pickup</span>

      <h1 style={styles.pageHeading}>
        Choose a Pickup Location
      </h1>

      <p
        style={{
          fontSize: "17px",
          color: "#475569",
          lineHeight: "1.6",
          marginBottom: "28px",
        }}
      >
        Select the store where you would like to collect
        your order.
      </p>

      {/* Product information */}
      <div
        style={{
          ...styles.card,
          marginBottom: "24px",
        }}
      >
        <h2 style={{ marginTop: 0, fontSize: "23px" }}>
          {selectedProduct.name}
        </h2>

        <p style={{ color: "#64748b" }}>
          Sold by {selectedProduct.store}
        </p>

        <strong style={{ fontSize: "26px" }}>
          {formatPrice(selectedProduct.price)}
        </strong>
      </div>

      <h2 style={{ fontSize: "23px" }}>
        Available Pickup Locations
      </h2>

      {/* Store selection */}
      <div
        role="group"
        aria-label="Pickup locations"
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {PICKUP_STORES.map((store) => {
          const selected = selectedStoreId === store.id;

          return (
            <button
              type="button"
              key={store.id}
              aria-pressed={selected}
              onClick={() => setSelectedStoreId(store.id)}
              style={{
                ...styles.card,
                width: "100%",
                textAlign: "left",
                color: "#1e293b",
                cursor: "pointer",
                backgroundColor: selected
                  ? "#fff4cf"
                  : "#ffffff",
                border: selected
                  ? "3px solid #d99915"
                  : "1px solid #cbd5e1",
                boxShadow: selected
                  ? "0 0 0 2px rgba(217,153,21,0.12)"
                  : "none",
                outlineOffset: "4px",
                transition:
                  "background-color 0.2s, border-color 0.2s",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "12px",
                }}
              >
                <h3
                  style={{
                    fontSize: "21px",
                    margin: 0,
                  }}
                >
                  {store.name}
                </h3>

                <span
                  aria-hidden="true"
                  style={{
                    fontSize: "25px",
                    color: selected
                      ? "#946200"
                      : "#64748b",
                  }}
                >
                  {selected ? "✓" : "○"}
                </span>
              </div>

              <p style={{ fontSize: "16px" }}>
                Location: {store.area}
              </p>

              <p
                style={{
                  fontSize: "16px",
                  color: "#15803d",
                  fontWeight: "700",
                }}
              >
                {store.pickupEstimate}
              </p>

              <p
                style={{
                  fontSize: "15px",
                  color: "#475569",
                }}
              >
                Store Hours: {store.hours}
              </p>

              <p
                style={{
                  fontSize: "16px",
                  fontWeight: "700",
                }}
              >
                Pickup Fee: Free
              </p>

              {selected && (
                <p
                  style={{
                    color: "#805500",
                    fontWeight: "700",
                  }}
                >
                  ✓ Selected Location
                </p>
              )}
            </button>
          );
        })}
      </div>

      {/* Summary */}
      <div
        style={{
          ...styles.card,
          marginTop: "28px",
          maxWidth: "680px",
        }}
      >
        <h2 style={{ marginTop: 0 }}>
          Pickup Summary
        </h2>

        <p style={{ fontSize: "16px" }}>
          <strong>Selected Store:</strong>{" "}
          {selectedStore
            ? selectedStore.name
            : "Choose a store above"}
        </p>

        <p style={{ fontSize: "16px" }}>
          <strong>Pickup Fee:</strong> Free
        </p>

        <div
          style={{
            borderTop: "1px solid #e2e8f0",
            paddingTop: "16px",
            marginTop: "16px",
            display: "flex",
            justifyContent: "space-between",
            gap: "12px",
            fontSize: "21px",
            fontWeight: "700",
          }}
        >
          <span>Total Before Tax</span>
          <span>{formatPrice(selectedProduct.price)}</span>
        </div>
      </div>

      {/* Actions */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          marginTop: "28px",
        }}
      >
        <button
          type="button"
          disabled={!selectedStore}
          onClick={handleContinue}
          style={{
            ...styles.yellowBtn,
            fontSize: "17px",
            padding: "16px 28px",
            opacity: selectedStore ? 1 : 0.55,
            cursor: selectedStore
              ? "pointer"
              : "not-allowed",
          }}
        >
          Continue with Selected Location
        </button>

        <button
          type="button"
          style={styles.outlineBtn}
          onClick={() => setCurrentView("buyingOptions")}
        >
          ← Back to Buying Options
        </button>
      </div>
    </div>
  );
}
