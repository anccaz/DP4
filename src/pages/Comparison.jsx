import { PRODUCTS } from "../data/products";
import { styles } from "../styles/styles";

export default function Comparison({ handleSelectProduct, setCurrentView }) {
  return (
    <div>
      <span style={styles.subLabel}>Decision Support</span>
      <h1 style={styles.pageHeading}>Product Comparison</h1>

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
              <th style={{ padding: "16px" }}>{PRODUCTS[0].name}</th>
              <th style={{ padding: "16px" }}>{PRODUCTS[1].name}</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
              <td style={{ padding: "16px", fontWeight: "600" }}>Price</td>
              <td
                style={{
                  padding: "16px",
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#fab633",
                }}
              >
                ${PRODUCTS[0].price}
              </td>
              <td
                style={{
                  padding: "16px",
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#fab633",
                }}
              >
                ${PRODUCTS[1].price}
              </td>
            </tr>
            <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
              <td style={{ padding: "16px", fontWeight: "600" }}>Cushioning</td>
              <td style={{ padding: "16px" }}>
                {PRODUCTS[0].specs.cushioning}
              </td>
              <td style={{ padding: "16px" }}>
                {PRODUCTS[1].specs.cushioning}
              </td>
            </tr>
            <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
              <td style={{ padding: "16px", fontWeight: "600" }}>Outsole</td>
              <td style={{ padding: "16px" }}>{PRODUCTS[0].specs.sole}</td>
              <td style={{ padding: "16px" }}>{PRODUCTS[1].specs.sole}</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
              <td style={{ padding: "16px", fontWeight: "600" }}>Weight</td>
              <td style={{ padding: "16px" }}>{PRODUCTS[0].specs.weight}</td>
              <td style={{ padding: "16px" }}>{PRODUCTS[1].specs.weight}</td>
            </tr>
            <tr>
              <td style={{ padding: "16px", fontWeight: "600" }}>Action</td>
              <td style={{ padding: "16px" }}>
                <button
                  style={styles.yellowBtn}
                  onClick={() => handleSelectProduct(PRODUCTS[0])}
                >
                  Select this
                </button>
              </td>
              <td style={{ padding: "16px" }}>
                <button
                  style={styles.outlineBtn}
                  onClick={() => handleSelectProduct(PRODUCTS[1])}
                >
                  Select this
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <button
        style={{ ...styles.outlineBtn, marginTop: "24px" }}
        onClick={() => setCurrentView("search")}
      >
        ← Back to search results
      </button>
    </div>
  );
}
