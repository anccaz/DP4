import { styles } from "../styles/styles";

export default function ProductDetails({ selectedProduct, setCurrentView }) {
  return (
    <div>
      <span style={styles.subLabel}>Product Details</span>
      <h1 style={styles.pageHeading}>{selectedProduct.name}</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.3fr",
          gap: "32px",
        }}
      >
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
            style={{ fontSize: "15px", color: "#64748b", fontWeight: "500" }}
          >
            Product photo
          </span>
        </div>

        <div style={styles.card}>
          <h2
            style={{ fontSize: "26px", fontWeight: "700", margin: "0 0 8px 0" }}
          >
            {selectedProduct.name}
          </h2>
          <div
            style={{
              color: "#16a34a",
              fontWeight: "600",
              fontSize: "14px",
              marginBottom: "16px",
            }}
          >
            Sold by {selectedProduct.store} • In stock
          </div>
          <div
            style={{ fontSize: "36px", fontWeight: "800", marginBottom: "4px" }}
          >
            ${selectedProduct.price.toFixed(2)}
          </div>
          <div
            style={{ fontSize: "14px", color: "#64748b", marginBottom: "20px" }}
          >
            Price shown before tax • Local pickup: FREE
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
              fontSize: "14px",
              color: "#475569",
              lineHeight: "1.5",
              marginBottom: "28px",
            }}
          >
            Available from a local store; online delivery options are also
            offered.
          </p>

          <div style={{ display: "flex", gap: "12px" }}>
            <button
              style={styles.grayBtn}
              onClick={() => setCurrentView("compare")}
            >
              Select products
            </button>
            <button
              style={styles.yellowBtn}
              onClick={() => setCurrentView("ask")}
            >
              Ask previous buyers
            </button>
            <button style={styles.grayBtn}>Buying options</button>
          </div>
        </div>
      </div>

      <button
        style={{ ...styles.outlineBtn, marginTop: "24px" }}
        onClick={() => setCurrentView("search")}
      >
        ← Back to results
      </button>
    </div>
  );
}
