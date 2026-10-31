
import { styles } from "../styles/styles";

export default function ProductDetails({
  selectedProduct,
  setCurrentView,
}) {
  const hasPickup = selectedProduct.availability
    .toLowerCase()
    .includes("local pickup");

  const availabilityText = selectedProduct.inStock
    ? "In stock"
    : "Out of stock";

  return (
    <div>
      <span style={styles.subLabel}>Product Details</span>
      <h1 style={styles.pageHeading}>
        {selectedProduct.name}
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "32px",
        }}
      >
        {/* Product image placeholder */}
        <div
          style={{
            ...styles.card,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "380px",
          }}
        >
          <div
            style={{
              width: "160px",
              height: "160px",
              borderRadius: "50%",
              backgroundColor: "#eef2f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "16px",
            }}
          ></div>

          <span
            style={{
              fontSize: "15px",
              color: "#64748b",
              fontWeight: "500",
            }}
          >
            Product photo
          </span>
        </div>

        {/* Product information */}
        <div style={styles.card}>
          <h2
            style={{
              fontSize: "26px",
              fontWeight: "700",
              margin: "0 0 8px 0",
            }}
          >
            {selectedProduct.name}
          </h2>

          <div
            style={{
              color: selectedProduct.inStock
                ? "#15803d"
                : "#b91c1c",
              fontWeight: "600",
              fontSize: "16px",
              marginBottom: "16px",
            }}
          >
            Sold by {selectedProduct.store} •{" "}
            {availabilityText}
          </div>

          <div
            style={{
              fontSize: "36px",
              fontWeight: "800",
              marginBottom: "4px",
            }}
          >
            ${selectedProduct.price.toFixed(2)}
          </div>

          <div
            style={{
              fontSize: "14px",
              color: "#64748b",
              marginBottom: "20px",
            }}
          >
            Price shown before tax
          </div>

          <hr
            style={{
              border: "none",
              borderTop: "1px solid #e2e8f0",
              margin: "20px 0",
            }}
          />

          <p
            style={{
              fontSize: "16px",
              color: "#475569",
              lineHeight: "1.6",
              marginBottom: "12px",
            }}
          >
            {hasPickup
              ? "Local pickup is available for this product."
              : "Local pickup is not available for this product."}
          </p>

          <p
            style={{
              fontSize: "16px",
              color: "#475569",
              lineHeight: "1.6",
              marginBottom: "28px",
            }}
          >
            Shipping information: {selectedProduct.shipping}
          </p>

          {/* Product actions */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <button
              type="button"
              style={styles.grayBtn}
              onClick={() => setCurrentView("compare")}
            >
              Select products
            </button>

            <button
              type="button"
              style={styles.grayBtn}
              onClick={() => setCurrentView("ask")}
            >
              Ask previous buyers
            </button>

            <button
              type="button"
              style={{
                ...styles.yellowBtn,
                opacity: selectedProduct.inStock ? 1 : 0.5,
                cursor: selectedProduct.inStock
                  ? "pointer"
                  : "not-allowed",
              }}
              disabled={!selectedProduct.inStock}
              onClick={() => setCurrentView("buyingOptions")}
            >
              View Buying Options
            </button>
          </div>
        </div>
      </div>

      <button
        type="button"
        style={{
          ...styles.outlineBtn,
          marginTop: "24px",
        }}
        onClick={() => setCurrentView("search")}
      >
        ← Back to results
      </button>
    </div>
  );
}
