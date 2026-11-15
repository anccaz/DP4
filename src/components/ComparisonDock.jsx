
import { PRODUCTS } from "../data/products";
import { styles } from "../styles/styles";

export default function ComparisonDock({
  selectedForCompare,
  toggleCompareCheckbox,
  setCurrentView,
}) {
  const selectedProducts = selectedForCompare
    .map((id) => PRODUCTS.find((product) => product.id === id))
    .filter(Boolean);

  const count = selectedProducts.length;

  return (
    <aside
      aria-label="Product comparison selection"
      style={{
        ...styles.card,
        position: "fixed",
        top: "212px",
        right: 0,
        width: "220px",
        maxWidth: "calc(100vw - 32px)",
        zIndex: 100,
        padding: "20px 16px",
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      }}
    >
      <h3 style={{ margin: "0 0 8px", fontSize: "18px" }}>
        Compare Products
      </h3>

      <p
        style={{
          margin: "0 0 16px",
          fontSize: "14px",
          lineHeight: "1.5",
          color: "#475569",
        }}
      >
        Select two products using the Add to Compare
        buttons to see them side by side.
      </p>

      <div
        role="status"
        aria-live="polite"
        style={{
          padding: "10px",
          borderRadius: "8px",
          backgroundColor: "#f1f5f9",
          fontSize: "14px",
          fontWeight: "700",
          marginBottom: "16px",
        }}
      >
        {count} of 2 products selected
      </div>

      {selectedProducts.map((product) => (
        <div
          key={product.id}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "8px",
            padding: "10px 0",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <span
            style={{
              overflowWrap: "anywhere",
              minWidth: 0,
              fontSize: "14px",
            }}
          >
            {product.name}
          </span>

          <button
            type="button"
            onClick={() => toggleCompareCheckbox(product.id)}
            aria-label={`Remove ${product.name} from comparison`}
            title="Remove product"
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontSize: "20px",
              padding: "4px",
              color: "#64748b",
            }}
          >
            ×
          </button>
        </div>
      ))}

      {count === 0 && (
        <p style={{ fontSize: "13px", color: "#64748b" }}>
          No products selected yet.
        </p>
      )}

      {count === 1 && (
        <p style={{ fontSize: "13px", color: "#475569" }}>
          Select one more product to continue.
        </p>
      )}

      {count === 2 && (
        <p
          role="status"
          style={{
            fontSize: "13px",
            color: "#166534",
            fontWeight: "700",
          }}
        >
          Ready to compare.
        </p>
      )}

      <button
        type="button"
        disabled={count !== 2}
        onClick={() => setCurrentView("compare")}
        style={{
          ...styles.yellowBtn,
          width: "100%",
          marginTop: "16px",
          opacity: count === 2 ? 1 : 0.5,
          cursor: count === 2 ? "pointer" : "not-allowed",
        }}
      >
        Compare Selected Products
      </button>

      {count > 0 && (
        <button
          type="button"
          onClick={() =>
            selectedProducts.forEach((product) =>
              toggleCompareCheckbox(product.id)
            )
          }
          style={{
            ...styles.outlineBtn,
            width: "100%",
            marginTop: "10px",
          }}
        >
          Clear Selection
        </button>
      )}
    </aside>
  );
}
