import { useState } from "react";
import { PRODUCTS } from "../data/products";
import { styles } from "../styles/styles";
import ProductCard from "../components/ProductCard";
import ComparisonDock from "../components/ComparisonDock";

export default function ProductBrowsing({
  searchQuery,
  setSearchQuery,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  filterPickup,
  setFilterPickup,
  filterOnline,
  setFilterOnline,
  filterFreeShipping,
  setFilterFreeShipping,
  filterInStock,
  setFilterInStock,
  filterCategory,
  setFilterCategory,
  filterRating,
  setFilterRating,
  selectedForCompare,
  toggleCompareCheckbox,
  handleSelectProduct,
  setCurrentView,
}) {
  // Store search input separately until the user submits it
  const [draftSearch, setDraftSearch] = useState(searchQuery);

  // Track the selected product sorting method
  const [sortBy, setSortBy] = useState("priceLow");

  // Reset all product filters
  const clearFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setFilterPickup(false);
    setFilterOnline(false);
    setFilterFreeShipping(false);
    setFilterInStock(false);
    setFilterCategory("all");
    setFilterRating(false);
  };

  // Check whether any product filters are active
  const hasActiveFilters =
    minPrice !== "" ||
    maxPrice !== "" ||
    filterPickup ||
    filterOnline ||
    filterFreeShipping ||
    filterInStock ||
    filterCategory !== "all" ||
    filterRating;

  // Find products that match the search and price filter
  const filteredProducts = PRODUCTS.filter((product) => {
    const query = searchQuery.trim().toLowerCase();

    const matchesSearch =
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.keywords.some((keyword) =>
        keyword.toLowerCase().includes(query)
      );

    const matchesPrice =
      (minPrice === "" || product.price >= Number(minPrice)) &&
      (maxPrice === "" || product.price <= Number(maxPrice));
    const matchesPickup = !filterPickup || product.localPickup;
    const matchesOnline = !filterOnline || product.onlineDelivery;
    const matchesInStock = !filterInStock || product.inStock;
    const matchesCategory =
      filterCategory === "all" || product.category === filterCategory;
    const matchesRating = !filterRating || product.rating >= 4;
    const matchesFreeShipping =
      !filterFreeShipping ||
      (product.onlineDelivery &&
        product.shipping.toLowerCase().includes("free"));

    return (
      matchesSearch &&
      matchesPrice &&
      matchesPickup &&
      matchesOnline &&
      matchesFreeShipping &&
      matchesInStock &&
      matchesCategory &&
      matchesRating
    );
  });

  // Sort the filtered products based on the selected method
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "priceLow") return a.price - b.price;
    if (sortBy === "priceHigh") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;

    return 0;
  });

  return (
    <div>
      <span style={styles.subLabel}>Search products</span>

      <h1 style={styles.pageHeading}>
        {searchQuery.trim() ? `Results for "${searchQuery}"` : "All products"}
      </h1>

      {/* Allow the filter panel and products to stack on small screens */}
      <div
        style={{
          display: "flex",
          gap: "24px",
          flexWrap: "wrap",
        }}
      >
        {/* Filter sidebar */}
        <div
          style={{
            flex: "0 0 260px",
            minWidth: "min(100%, 260px)",
          }}
        >
          <div
            style={{
              ...styles.card,
              padding: "12px 24px 24px",
            }}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "700",
                marginBottom: "12px",
                marginTop: "6px",
                paddingBottom: "12px",
                borderBottom: "1px solid #f1f5f9",
              }}
            >
              Filters
            </h3>

            {/* Category filter */}
            <div style={{ marginBottom: "20px" }}>
              <div
                style={{
                  fontWeight: "600",
                  marginBottom: "10px",
                  fontSize: "14px",
                }}
              >
                Category
              </div>

              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "14px",
                  border: styles.card.border,
                  borderRadius: "8px",
                  backgroundColor: "#fff",
                }}
              >
                <option value="all">All categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Everyday Essentials">Everyday Essentials</option>
                <option value="Home & Living">Home & Living</option>
                <option value="Walking Aids">Walking Aids</option>
                <option value="Walking Shoes">Walking Shoes</option>
              </select>
            </div>

            {/* Price filter */}
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

              <div style={{ display: "flex", gap: "10px" }}>
                <label style={{ flex: 1, minWidth: 0, fontSize: "14px" }}>
                  Min ($)
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="0"
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      marginTop: "6px",
                      padding: "10px",
                      border: styles.card.border,
                      borderRadius: "8px",
                      fontSize: "14px",
                    }}
                  />
                </label>

                <label style={{ flex: 1, minWidth: 0, fontSize: "14px" }}>
                  Max ($)
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="Any"
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      marginTop: "6px",
                      padding: "10px",
                      border: styles.card.border,
                      borderRadius: "8px",
                      fontSize: "14px",
                    }}
                  />
                </label>
              </div>
            </div>

            {/* Customer rating filter */}
            <div style={{ marginBottom: "20px" }}>
              <div
                style={{
                  fontWeight: "600",
                  marginBottom: "10px",
                  fontSize: "14px",
                }}
              >
                Customer Rating
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
                  checked={filterRating}
                  onChange={(e) => setFilterRating(e.target.checked)}
                />
                4 Stars & Up
              </label>
            </div>

            {/* Availability filters */}
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
                  checked={filterInStock}
                  onChange={(e) => setFilterInStock(e.target.checked)}
                />
                In stock only
              </label>

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

            {/* Shipping filter */}
            <div>
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

              <button
                type="button"
                style={{
                  ...styles.outlineBtn,
                  width: "100%",
                  marginTop: "20px",
                  opacity: hasActiveFilters ? 1 : 0.5,
                  cursor: hasActiveFilters ? "pointer" : "not-allowed",
                }}
                onClick={clearFilters}
                disabled={!hasActiveFilters}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Product list */}
        <div
          style={{
            flex: "1 1 320px",
            minWidth: 0,
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!draftSearch.trim()) return;
              setSearchQuery(draftSearch.trim());
            }}
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "24px",
            }}
          >
            <input
              type="search"
              value={draftSearch}
              onChange={(e) => setDraftSearch(e.target.value)}
              placeholder="Search for products..."
              aria-label="Search products"
              style={{
                flex: 1,
                minWidth: 0,
                padding: "14px 16px",
                fontSize: "16px",
                border: styles.card.border,
                borderRadius: "8px",
                boxShadow: styles.card.boxShadow,
                boxSizing: "border-box",
              }}
            />

            <button type="submit" style={styles.yellowBtn}>
              Search
            </button>
          </form>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            <span
              style={{
                fontSize: "18px",
                fontWeight: "700",
              }}
            >
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "product" : "products"} found
            </span>

            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "14px",
                color: "#475569",
              }}
            >
              Sort by:
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: "8px",
                  fontSize: "14px",
                  border: styles.card.border,
                  borderRadius: "8px",
                  backgroundColor: "#fff",
                  cursor: "pointer",
                }}
              >
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </label>
          </div>

          {/* Show each matching product */}
          {sortedProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              selectedForCompare={selectedForCompare}
              toggleCompareCheckbox={toggleCompareCheckbox}
              handleSelectProduct={handleSelectProduct}
            />
          ))}
        </div>
      </div>

      {/* Floating comparison panel */}
      <ComparisonDock
        selectedForCompare={selectedForCompare}
        toggleCompareCheckbox={toggleCompareCheckbox}
        setCurrentView={setCurrentView}
      />
    </div>
  );
}
