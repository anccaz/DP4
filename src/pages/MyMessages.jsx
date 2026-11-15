import { useState } from "react";
import { styles } from "../styles/styles";
import { PRODUCTS } from "../data/products";

function formatDate(isoString) {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function MyMessages({
  questions,
  handleSelectProduct,
  onDeleteQuestion,
  setCurrentView,
}) {
  // The question waiting for delete confirmation, if any.
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  // Newest questions first.
  const sortedQuestions = [...questions].sort(
    (a, b) => new Date(b.postedAt) - new Date(a.postedAt)
  );

  return (
    <div>
      <span style={styles.subLabel}>Messages</span>
      <h1 style={styles.pageHeading}>Your questions</h1>

      <div style={styles.card}>
        <p style={{ marginTop: 0, marginBottom: "24px", color: "#475569" }}>
          Questions you've asked previous buyers, newest first. Check back here
          to see when a buyer has answered.
        </p>

        {sortedQuestions.length === 0 ? (
          <div
            style={{
              backgroundColor: "#f1f5f9",
              borderRadius: "12px",
              padding: "24px",
              textAlign: "center",
            }}
          >
            <p style={{ fontWeight: "700", fontSize: "17px", marginTop: 0 }}>
              You haven't asked any questions yet.
            </p>
            <p style={{ color: "#64748b", marginBottom: "20px" }}>
              Open a product and choose "Ask previous buyers" to post one.
            </p>
            <button
              style={styles.yellowBtn}
              onClick={() => setCurrentView("home")}
            >
              Browse products
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {sortedQuestions.map((item) => {
              const product = PRODUCTS.find((p) => p.id === item.productId);
              const answered = Boolean(item.answer);

              return (
                <div
                  key={item.id}
                  style={{
                    backgroundColor: "#f1f5f9",
                    borderRadius: "12px",
                    padding: "20px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: "12px",
                      flexWrap: "wrap",
                      marginBottom: "10px",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: "700", fontSize: "16px" }}>
                        {item.productName}
                      </div>
                      <div style={{ fontSize: "13px", color: "#64748b" }}>
                        Asked {formatDate(item.postedAt)}
                      </div>
                    </div>

                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: "700",
                        padding: "6px 12px",
                        borderRadius: "999px",
                        backgroundColor: answered ? "#dcfce7" : "#fef3c7",
                        color: answered ? "#15803d" : "#92400e",
                      }}
                    >
                      {answered ? "Answered" : item.status}
                    </span>
                  </div>

                  <div
                    style={{
                      fontWeight: "600",
                      fontSize: "15px",
                      marginBottom: "6px",
                    }}
                  >
                    Q: {item.q}
                  </div>
                  {answered && (
                    <div style={{ fontSize: "14px", color: "#334155" }}>
                      A: {item.answer}
                    </div>
                  )}

                  {deleteTargetId === item.id ? (
                    <div
                      role="alertdialog"
                      aria-labelledby={`delete-title-${item.id}`}
                      style={{
                        border: "2px solid #fca5a5",
                        borderRadius: "12px",
                        backgroundColor: "#fff7f7",
                        padding: "18px",
                        marginTop: "14px",
                      }}
                    >
                      <p
                        id={`delete-title-${item.id}`}
                        style={{ marginTop: 0, fontWeight: "700" }}
                      >
                        Delete this question? This can't be undone.
                      </p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                        <button
                          type="button"
                          style={{
                            ...styles.grayBtn,
                            backgroundColor: "#fee2e2",
                            color: "#991b1b",
                          }}
                          onClick={() => {
                            onDeleteQuestion(item.id);
                            setDeleteTargetId(null);
                          }}
                        >
                          Yes, delete question
                        </button>
                        <button
                          type="button"
                          style={styles.yellowBtn}
                          onClick={() => setDeleteTargetId(null)}
                        >
                          Keep question
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "12px",
                        marginTop: "14px",
                      }}
                    >
                      {product && (
                        <button
                          type="button"
                          style={styles.outlineBtn}
                          onClick={() => handleSelectProduct(product)}
                        >
                          View product
                        </button>
                      )}
                      <button
                        type="button"
                        style={{
                          ...styles.outlineBtn,
                          borderColor: "#fca5a5",
                          color: "#991b1b",
                        }}
                        onClick={() => setDeleteTargetId(item.id)}
                      >
                        Delete question
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
