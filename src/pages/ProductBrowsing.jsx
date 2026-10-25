import { PRODUCTS } from "../data/products";
import { styles } from "../styles/styles";
import ProductCard from "../components/ProductCard";

export default function ProductBrowsing({
  searchQuery,
  filterPrice,
  setFilterPrice,
  filterPickup,
  setFilterPickup,
  filterOnline,
  setFilterOnline,
  filterFreeShipping,
  setFilterFreeShipping,
  selectedForCompare,
  toggleCompareCheckbox,
  handleSelectProduct,
  setCurrentView,
}) {
  const filteredProducts = PRODUCTS.filter((product) => {
    const query = searchQuery.trim().toLowerCase();

    return (
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.keywords.some((keyword) => keyword.toLowerCase().includes(query))
    );
  });
  return (
    <div>
      <span style={styles.subLabel}>Search products</span>
      <h1 style={styles.pageHeading}>
        {searchQuery.trim() ? `Results for "${searchQuery}"` : "All products"}
      </h1>

      <div style={{ display: "flex", gap: "24px" }}>
        {/* Filter Sidebar */}
        <div style={{ width: "260px" }}>
          <div style={{ ...styles.card, padding: "24px" }}>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "700",
                marginBottom: "20px",
                paddingBottom: "12px",
                borderBottom: "1px solid #f1f5f9",
              }}
            >
              Filters
            </h3>

            <div style={{ marginBottom: "20px" }}>
              <div
                style={{
                  fontWeight: "600",
                  marginBottom: "10px",
                  fontSize: "14px",
                }}
              >
                Price range
              </div>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px",
                  cursor: "pointer",
                  color: "#475569",
                }}
              >
                <input
                  type="checkbox"
                  checked={filterPrice}
                  onChange={(e) => setFilterPrice(e.target.checked)}
                />
                Under $75
              </label>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <div
                style={{
                  fontWeight: "600",
                  marginBottom: "10px",
                  fontSize: "14px",
                }}
              >
                Availability
              </div>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px",
                  cursor: "pointer",
                  marginBottom: "6px",
                  color: "#475569",
                }}
              >
                <input
                  type="checkbox"
                  checked={filterPickup}
                  onChange={(e) => setFilterPickup(e.target.checked)}
                />
                Local pickup
              </label>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px",
                  cursor: "pointer",
                  color: "#475569",
                }}
              >
                <input
                  type="checkbox"
                  checked={filterOnline}
                  onChange={(e) => setFilterOnline(e.target.checked)}
                />
                Online delivery
              </label>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <div
                style={{
                  fontWeight: "600",
                  marginBottom: "10px",
                  fontSize: "14px",
                }}
              >
                Shipping
              </div>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px",
                  cursor: "pointer",
                  color: "#475569",
                }}
              >
                <input
                  type="checkbox"
                  checked={filterFreeShipping}
                  onChange={(e) => setFilterFreeShipping(e.target.checked)}
                />
                Free shipping
              </label>
            </div>

            <button style={{ ...styles.yellowBtn, width: "100%" }}>
              Choose filters
            </button>
          </div>
        </div>

        {/* Product List */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <span style={{ fontSize: "18px", fontWeight: "700" }}>
              {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} found
            </span>
            <span style={{ fontSize: "13px", color: "#64748b" }}>
              Sort: Lowest total price
            </span>
          </div>

          {filteredProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              selectedForCompare={selectedForCompare}
              toggleCompareCheckbox={toggleCompareCheckbox}
              handleSelectProduct={handleSelectProduct}
            />
          ))}

          <button
            style={{ ...styles.grayBtn, marginTop: "8px" }}
            onClick={() => setCurrentView("compare")}
          >
            Compare selected products ({selectedForCompare.length})
          </button>
        </div>
      </div>
    </div>
  );
}
