import { styles } from "../styles/styles";

export default function ProductCard({
  product,
  selectedForCompare,
  toggleCompareCheckbox,
  handleSelectProduct,
}) {
  return (
    <div
      style={{
        ...styles.card,
        padding: "24px",
        marginBottom: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <div
          style={{
            width: "90px",
            height: "90px",
            backgroundColor: "#eef2f6",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "11px",
            fontWeight: "700",
            color: "#64748b",
          }}
        >
          PRODUCT
        </div>

        <div>
          <h4
            style={{ margin: "0 0 6px 0", fontSize: "18px", fontWeight: "700" }}
          >
            {product.name}
          </h4>
          <div
            style={{ fontSize: "14px", color: "#64748b", marginBottom: "8px" }}
          >
            {product.store} • {product.availability}
          </div>
          <div
            style={{ fontSize: "20px", fontWeight: "800", color: "#1e293b" }}
          >
            ${product.price.toFixed(2)}
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          minWidth: "150px",
        }}
      >
        <button
          style={styles.yellowBtn}
          onClick={() => handleSelectProduct(product)}
        >
          View details
        </button>
        <button
          style={{
            ...styles.grayBtn,
            backgroundColor: selectedForCompare.includes(product.id)
              ? "#cbd5e1"
              : "#eef2f6",
          }}
          onClick={() => toggleCompareCheckbox(product.id)}
        >
          {selectedForCompare.includes(product.id)
            ? "Selected ✓"
            : "Select product"}
        </button>
      </div>
    </div>
  );
}
