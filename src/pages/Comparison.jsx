
import { PRODUCTS } from "../data/products";
import { styles } from "../styles/styles";

export default function Comparison({
  selectedForCompare,
  handleSelectProduct,
  setCurrentView,
}) {
  // Get the products selected 
  const comparedProducts = selectedForCompare
    .map((id) => PRODUCTS.find((product) => product.id === id))
    .filter(Boolean);

  // Get all spec names from selected products
  const specKeys = [
    ...new Set(
      comparedProducts.flatMap((product) =>
        Object.keys(product.specs)
      )
    ),
  ];

  return (
    <div>
      <span style={styles.subLabel}>Decision Support</span>
      <h1 style={styles.pageHeading}>Product Comparison</h1>

      {comparedProducts.length === 0 ? (
        <div style={styles.card}>
          <p>No products selected for comparison.</p>
          <button
            style={styles.yellowBtn}
            onClick={() => setCurrentView("search")}
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div style={{ ...styles.card, overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
              fontSize: "15px",
            }}
          >
            <thead>
              <tr style={{ borderBottom: "2px solid #e2e8f0" }}>
                <th style={{ padding: "16px" }}>Feature</th>

                {comparedProducts.map((product) => (
                  <th key={product.id} style={{ padding: "16px" }}>
                    {product.name}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {/* Price */}
              <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "16px", fontWeight: "600" }}>
                  Price
                </td>

                {comparedProducts.map((product) => (
                  <td
                    key={product.id}
                    style={{
                      padding: "16px",
                      fontSize: "18px",
                      fontWeight: "700",
                      color: "#fab633",
                    }}
                  >
                    ${product.price.toFixed(2)}
                  </td>
                ))}
              </tr>

              {/* Store */}
              <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "16px", fontWeight: "600" }}>
                  Store
                </td>

                {comparedProducts.map((product) => (
                  <td key={product.id} style={{ padding: "16px" }}>
                    {product.store}
                  </td>
                ))}
              </tr>

              {/* Rating */}
              <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "16px", fontWeight: "600" }}>
                  Rating
                </td>

                {comparedProducts.map((product) => (
                  <td key={product.id} style={{ padding: "16px" }}>
                    {product.rating} / 5
                  </td>
                ))}
              </tr>

              {/* Availability */}
              <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "16px", fontWeight: "600" }}>
                  Availability
                </td>

                {comparedProducts.map((product) => (
                  <td key={product.id} style={{ padding: "16px" }}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </td>
                ))}
              </tr>

              {/* Shipping */}
              <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "16px", fontWeight: "600" }}>
                  Shipping
                </td>

                {comparedProducts.map((product) => (
                  <td key={product.id} style={{ padding: "16px" }}>
                    {product.shipping}
                  </td>
                ))}
              </tr>

              {/* Dynamic Product Specifications */}
              {specKeys.map((spec) => (
                <tr
                  key={spec}
                  style={{ borderBottom: "1px solid #f1f5f9" }}
                >
                  <td style={{ padding: "16px", fontWeight: "600" }}>
                    {spec.replace(/([A-Z])/g, " $1")}
                  </td>

                  {comparedProducts.map((product) => (
                    <td key={product.id} style={{ padding: "16px" }}>
                      {product.specs[spec] ?? "N/A"}
                    </td>
                  ))}
                </tr>
              ))}

              {/* Select Product */}
              <tr>
                <td style={{ padding: "16px", fontWeight: "600" }}>
                  Action
                </td>

                {comparedProducts.map((product) => (
                  <td key={product.id} style={{ padding: "16px" }}>
                    <button
                      style={styles.yellowBtn}
                      onClick={() => handleSelectProduct(product)}
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

      <button
        style={{ ...styles.outlineBtn, marginTop: "24px" }}
        onClick={() => setCurrentView("search")}
      >
        ← Back to search results
      </button>
    </div>
  );
}
