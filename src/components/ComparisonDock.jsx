import { PRODUCTS } from "../data/products";
import { styles } from "../styles/styles";

export default function ComparisonDock({
  selectedForCompare,
  toggleCompareCheckbox,
  setCurrentView,
}) {
  const selectedProducts = PRODUCTS.filter((product) =>
    selectedForCompare.includes(product.id),
  );

  if (selectedProducts.length === 0) return null;

  return (
    <div
      style={{
        ...styles.card,
        position: "fixed",
        top: "212px",
        right: 0,
        width: "190px",
        maxWidth: "calc(100vw - 32px)",
        zIndex: 100,
        padding: "24px 16px",
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      }}
    >
      <h3 style={{ margin: "0 0 20px" }}>
        Compare Products ({selectedProducts.length}/2)
      </h3>

      {selectedProducts.map((product) => (
        <div
          key={product.id}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "8px",
            marginBottom: "16px",
          }}
        >
          <span style={{ overflowWrap: "anywhere", minWidth: 0 }}>
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

      <button
        type="button"
        style={{
          ...styles.yellowBtn,
          width: "100%",
          marginTop: "8px",
          opacity: selectedProducts.length === 2 ? 1 : 0.5,
          cursor: selectedProducts.length === 2 ? "pointer" : "not-allowed",
        }}
        disabled={selectedProducts.length !== 2}
        onClick={() => setCurrentView("compare")}
      >
        {selectedProducts.length === 2
          ? "Compare Products"
          : "Select 1 More Product"}
      </button>
    </div>
  );
}
