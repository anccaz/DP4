
import { useState } from "react";
import { styles } from "../styles/styles";

export default function BuyingOptions({
  selectedProduct,
  setCurrentView,
  onContinue,
}) {
  const [selectedOption, setSelectedOption] = useState(null);

  const hasPickup =
    selectedProduct.localPickup && selectedProduct.inStock;
  const hasDelivery =
    selectedProduct.onlineDelivery && selectedProduct.inStock;

  const productPrice = selectedProduct.price;

  const isFreeShipping = selectedProduct.shipping
    .toLowerCase()
    .includes("free");

  const formatPrice = (amount) => `$${amount.toFixed(2)}`;

  const options = [
    {
      id: "pickup",
      title: "Local Pickup",
      description: "Collect your product from a local store.",
      available: hasPickup,
      shippingCost: 0,
    },
    {
      id: "delivery",
      title: "Online Delivery",
      description: "Have your product delivered to your address.",
      available: hasDelivery,
      shippingCost: isFreeShipping ? 0 : null,
    },
  ];

  const activeOption = options.find(
    (option) => option.id === selectedOption
  );

  const handleContinue = () => {
    if (!activeOption?.available) return;
    onContinue(selectedOption);
  };

  const renderPriceDetails = (option) => {
    const knownShipping = option.shippingCost !== null;

    return (
      <div
        style={{
          borderTop: "1px solid #e2e8f0",
          marginTop: "16px",
          paddingTop: "16px",
          fontSize: "16px",
          lineHeight: "1.8",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <span>Item price</span>
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
            {option.id === "pickup"
              ? "Pickup fee"
              : "Shipping"}
          </span>
          <strong>
            {option.shippingCost === 0
              ? "Free"
              : knownShipping
                ? formatPrice(option.shippingCost)
                : "Not yet calculated"}
          </strong>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "12px",
            marginTop: "12px",
            fontSize: "20px",
            fontWeight: "700",
          }}
        >
          <span>
            {knownShipping ? "Total before tax" : "Subtotal"}
          </span>
          <span>
            {formatPrice(
              productPrice + (option.shippingCost ?? 0)
            )}
          </span>
        </div>

        {!knownShipping && (
          <p
            style={{
              color: "#64748b",
              fontSize: "14px",
              marginTop: "8px",
            }}
          >
            Shipping is not yet calculated and is
            excluded from the subtotal.
          </p>
        )}
      </div>
    );
  };

  return (
    <div>
      <span style={styles.subLabel}>Buying Options</span>

      <h1 style={styles.pageHeading}>
        Choose how to receive your product
      </h1>

      <div
        style={{
          ...styles.card,
          marginBottom: "24px",
        }}
      >
        <h2 style={{ marginTop: 0 }}>
          {selectedProduct.name}
        </h2>

        <p
          style={{
            color: "#475569",
            fontSize: "16px",
          }}
        >
          Sold by {selectedProduct.store}
        </p>

        <div
          style={{
            fontSize: "30px",
            fontWeight: "800",
          }}
        >
          {formatPrice(productPrice)}
        </div>

        <p style={{ color: "#64748b" }}>
          Item price before shipping and tax
        </p>
      </div>

      <h2 style={{ fontSize: "24px" }}>
        Available buying methods
      </h2>

      <div
        role="group"
        aria-label="Choose a buying option"
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "20px",
        }}
      >
        {options.map((option) => {
          const isSelected = selectedOption === option.id;

          return (
            <button
              key={option.id}
              type="button"
              disabled={!option.available}
              aria-pressed={isSelected}
              onClick={() => setSelectedOption(option.id)}
              style={{
                ...styles.card,
                width: "100%",
                textAlign: "left",
                color: "#1e293b",
                cursor: option.available
                  ? "pointer"
                  : "not-allowed",
                backgroundColor: isSelected
                  ? "#fff4cf"
                  : "#ffffff",
                border: isSelected
                  ? "3px solid #d99915"
                  : "1px solid #cbd5e1",
                boxShadow: isSelected
                  ? "0 0 0 2px rgba(217,153,21,0.12)"
                  : "none",
                transition:
                  "background-color 0.2s ease, border-color 0.2s ease",
                outlineOffset: "4px",
                opacity: option.available ? 1 : 0.65,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <h3
                  style={{
                    fontSize: "24px",
                    margin: 0,
                  }}
                >
                  {option.title}
                </h3>

                <span
                  aria-hidden="true"
                  style={{
                    fontSize: "24px",
                    color: isSelected
                      ? "#946200"
                      : "#64748b",
                  }}
                >
                  {isSelected ? "✓" : "○"}
                </span>
              </div>

              <p
                style={{
                  fontSize: "16px",
                  lineHeight: 1.6,
                }}
              >
                {option.description}
              </p>

              <p
                style={{
                  fontWeight: "700",
                  color: option.available
                    ? "#15803d"
                    : "#b91c1c",
                }}
              >
                {option.available
                  ? "Available"
                  : !selectedProduct.inStock
                    ? "Product is out of stock"
                    : "Not available for this product"}
              </p>

              {option.available &&
                renderPriceDetails(option)}

              {isSelected && (
                <p
                  style={{
                    fontWeight: "700",
                    color: "#805500",
                  }}
                >
                  ✓ Selected buying method
                </p>
              )}
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: "28px" }}>
        <button
          type="button"
          style={{
            ...styles.yellowBtn,
            fontSize: "17px",
            padding: "16px 28px",
            opacity: activeOption?.available ? 1 : 0.55,
            cursor: activeOption?.available
              ? "pointer"
              : "not-allowed",
          }}
          disabled={!activeOption?.available}
          onClick={handleContinue}
        >
          Continue with selected option
        </button>

        <p
          style={{
            color: "#64748b",
            fontSize: "14px",
            marginTop: "12px",
          }}
        >
          You will review your order details before
          placing the order.
        </p>
      </div>

      <div style={{ marginTop: "24px" }}>
        <button
          type="button"
          style={styles.outlineBtn}
          onClick={() => setCurrentView("details")}
        >
          ← Back to Product
        </button>
      </div>
    </div>
  );
}
