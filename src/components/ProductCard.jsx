
import { styles } from "../styles/styles";

export default function ProductCard({
  product,
  selectedForCompare,
  toggleCompareCheckbox,
  handleSelectProduct,
}) {
  const isSelected = selectedForCompare.includes(product.id);
  const comparisonFull = selectedForCompare.length >= 2;
  const cannotSelect = comparisonFull && !isSelected;

  return (
    <div
      style={{
        ...styles.card,
        padding: "24px",
        marginBottom: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "16px",
        border: isSelected
          ? "2px solid #d99915"
          : styles.card.border,
        backgroundColor: isSelected ? "#fffbeb" : "#fff",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          flex: "1 1 0",
          minWidth: "200px",
        }}
      >
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
            style={{
              margin: "0 0 6px",
              fontSize: "18px",
              fontWeight: "700",
            }}
          >
            {product.name}
          </h4>

          <div
            style={{
              fontSize: "14px",
              color: "#64748b",
              marginBottom: "8px",
            }}
          >
            {product.store} • ★ {product.rating} / 5
          </div>

          <div
            style={{
              fontSize: "20px",
              fontWeight: "800",
              color: "#1e293b",
            }}
          >
            ${product.price.toFixed(2)}
          </div>

          <div
            style={{
              fontSize: "14px",
              color: "#64748b",
              marginTop: "6px",
            }}
          >
            {product.shipping}
          </div>

          <div
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: product.inStock ? "#166534" : "#b91c1c",
              marginTop: "6px",
            }}
          >
            {product.inStock ? "In Stock" : "Out of Stock"}
          </div>

          {isSelected && (
            <div
              role="status"
              style={{
                marginTop: "10px",
                color: "#92400e",
                fontWeight: "700",
                fontSize: "14px",
              }}
            >
              ✓ Selected for comparison
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "210px",
          flexShrink: 0,
        }}
      >
        <button
          type="button"
          style={styles.yellowBtn}
          onClick={() => handleSelectProduct(product)}
        >
          View details
        </button>

        <button
          type="button"
          disabled={cannotSelect}
          aria-pressed={isSelected}
          onClick={() => toggleCompareCheckbox(product.id)}
          style={{
            ...styles.grayBtn,
            width: "100%",
            boxSizing: "border-box",
            backgroundColor: isSelected
              ? "#fde68a"
              : "#eef2f6",
            border: isSelected
              ? "2px solid #d99915"
              : "2px solid transparent",
            opacity: cannotSelect ? 0.5 : 1,
            cursor: cannotSelect ? "not-allowed" : "pointer",
          }}
        >
          {isSelected
            ? "✓ Remove from Compare"
            : "Add to Compare"}
        </button>

        {cannotSelect && (
          <span
            style={{
              fontSize: "12px",
              color: "#64748b",
              textAlign: "center",
            }}
          >
            Two products selected. Remove one to add another.
          </span>
        )}
      </div>
    </div>
  );
}
