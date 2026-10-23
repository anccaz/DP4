import { styles } from "../styles/styles";

export default function Home({
  searchQuery,
  setSearchQuery,
  handleSearchSubmit,
  setCurrentView,
}) {
  return (
    <div>
      <div style={styles.card}>
        <span style={styles.subLabel}>Shop with confidence</span>
        <h1
          style={{
            fontSize: "38px",
            fontWeight: "800",
            margin: "10px 0 12px 0",
            color: "#1e293b",
          }}
        >
          What are you looking for?
        </h1>
        <p style={{ color: "#64748b", fontSize: "16px", marginBottom: "28px" }}>
          Find products, compare prices, and manage orders in one simple place.
        </p>
        <form
          onSubmit={handleSearchSubmit}
          style={{ display: "flex", gap: "12px" }}
        >
          <input
            type="text"
            placeholder="Search for walking shoes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              padding: "16px 20px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              fontSize: "16px",
              outline: "none",
            }}
          />
          <button type="submit" style={styles.yellowBtn}>
            Search
          </button>
        </form>
      </div>

      <div style={{ marginTop: "36px" }}>
        <h3
          style={{ fontSize: "20px", fontWeight: "700", marginBottom: "18px" }}
        >
          Quick actions
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
        >
          <div
            style={{ ...styles.card, padding: "24px", cursor: "pointer" }}
            onClick={() => setCurrentView("search")}
          >
            <h4
              style={{
                margin: "0 0 6px 0",
                fontSize: "17px",
                fontWeight: "600",
              }}
            >
              Find products →
            </h4>
            <p style={{ margin: 0, color: "#64748b", fontSize: "14px" }}>
              Search online and nearby
            </p>
          </div>
          <div
            style={{ ...styles.card, padding: "24px", cursor: "pointer" }}
            onClick={() => setCurrentView("track")}
          >
            <h4
              style={{
                margin: "0 0 6px 0",
                fontSize: "17px",
                fontWeight: "600",
              }}
            >
              Track an order →
            </h4>
            <p style={{ margin: 0, color: "#64748b", fontSize: "14px" }}>
              Check delivery progress
            </p>
          </div>
          <div
            style={{ ...styles.card, padding: "24px", cursor: "pointer" }}
            onClick={() => setCurrentView("return")}
          >
            <h4
              style={{
                margin: "0 0 6px 0",
                fontSize: "17px",
                fontWeight: "600",
              }}
            >
              Start a return →
            </h4>
            <p style={{ margin: 0, color: "#64748b", fontSize: "14px" }}>
              Return an earlier purchase
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
