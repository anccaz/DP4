
import { PRODUCTS } from "../data/products";
import { styles } from "../styles/styles";

export default function Comparison({
  selectedForCompare,
  handleSelectProduct,
  onRemoveProduct,
  setCurrentView,
}) {
  // Find the products the user selected
  const comparedProducts = selectedForCompare
    .map((id) => PRODUCTS.find((product) => product.id === id))
    .filter(Boolean);

  // Collect the specifications of both selected products
  const specKeys = [
    ...new Set(
      comparedProducts.flatMap((product) =>
        Object.keys(product.specs ?? {})
      )
    ),
  ];

  // Information displayed in the comparison table
  const comparisonRows = [
    {
      label: "Price",
      getValue: (product) => `$${product.price.toFixed(2)}`,
    },
    {
      label: "Store",
      getValue: (product) => product.store,
    },
    {
      label: "Rating",
      getValue: (product) => `${product.rating} / 5`,
    },
    {
      label: "Availability",
      getValue: (product) =>
        product.inStock ? "In Stock" : "Out of Stock",
    },
    {
      label: "Shipping",
      getValue: (product) => product.shipping,
    },

    // Add specifications such as weight and cushioning
    ...specKeys.map((key) => ({
      label: key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (letter) => letter.toUpperCase()),
      getValue: (product) =>
        product.specs?.[key] ?? "N/A",
    })),
  ];

  // Only show the comparison table when two products exist
  const canCompare = comparedProducts.length === 2;

  return (
    <div>
      <span style={styles.subLabel}>Decision Support</span>

      <h1 style={styles.pageHeading}>
        Product Comparison
      </h1>

      {/* Show the products currently selected */}
      {comparedProducts.length > 0 && (
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "20px",
          }}
        >
          {comparedProducts.map((product) => (
            <button
              key={product.id}
              type="button"
              style={styles.outlineBtn}
              onClick={() => onRemoveProduct(product.id)}
              aria-label={`Remove ${product.name} from comparison`}
            >
              {product.name} ×
            </button>
          ))}
        </div>
      )}

      {/* Ask the user to select two products if needed */}
      {!canCompare ? (
        <div style={styles.card} role="status">
          <p>
            {comparedProducts.length === 0
              ? "No products selected."
              : "One product selected."}
          </p>

          <p>
            Select two products to compare their
            prices and features.
          </p>

          <button
            type="button"
            style={styles.yellowBtn}
            onClick={() => setCurrentView("search")}
          >
            Choose Products
          </button>
        </div>
      ) : (
        /* The table can scroll sideways on smaller screens */
        <div
          role="region"
          aria-label="Product comparison table"
          tabIndex={0}
          style={{
            ...styles.card,
            overflowX: "auto",
            maxWidth: "100%",
            padding: "16px",
          }}
        >
          <table
            style={{
              width: "100%",
              minWidth: "600px",
              borderCollapse: "collapse",
              textAlign: "left",
              fontSize: "15px",
            }}
          >
            <caption
              style={{
                textAlign: "left",
                paddingBottom: "16px",
                color: "#475569",
              }}
            >
              Side-by-side comparison of two selected products
            </caption>

            <thead>
              <tr
                style={{
                  borderBottom: "2px solid #e2e8f0",
                }}
              >
                <th
                  scope="col"
                  style={{ padding: "16px" }}
                >
                  Feature
                </th>

                {/* Display the selected product names */}
                {comparedProducts.map((product) => (
                  <th
                    key={product.id}
                    scope="col"
                    style={{ padding: "16px" }}
                  >
                    {product.name}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {/* Display each product's information */}
              {comparisonRows.map((row) => (
                <tr
                  key={row.label}
                  style={{
                    borderBottom: "1px solid #f1f5f9",
                  }}
                >
                  <th
                    scope="row"
                    style={{
                      padding: "16px",
                      fontWeight: "600",
                      textAlign: "left",
                    }}
                  >
                    {row.label}
                  </th>

                  {comparedProducts.map((product) => (
                    <td
                      key={product.id}
                      style={{
                        padding: "16px",
                        fontWeight:
                          row.label === "Price"
                            ? "700"
                            : "400",
                        color:
                          row.label === "Price"
                            ? "#b45309"
                            : "#1e293b",
                      }}
                    >
                      {row.getValue(product)}
                    </td>
                  ))}
                </tr>
              ))}

              {/* Open details for the preferred product */}
              <tr>
                <th
                  scope="row"
                  style={{
                    padding: "16px",
                    textAlign: "left",
                  }}
                >
                  Action
                </th>

                {comparedProducts.map((product) => (
                  <td
                    key={product.id}
                    style={{ padding: "16px" }}
                  >
                    <button
                      type="button"
                      style={styles.yellowBtn}
                      aria-label={`View details for ${product.name}`}
                      onClick={() =>
                        handleSelectProduct(product)
                      }
                    >
                      Select this
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Return to product browsing */}
      <button
        type="button"
        style={{
          ...styles.outlineBtn,
          marginTop: "24px",
        }}
        onClick={() => setCurrentView("search")}
      >
        ← Back to search results
      </button>
    </div>
  );
}
