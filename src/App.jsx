import { useState } from "react";
import { PRODUCTS } from "./data/products";
import { styles } from "./styles/styles";
import Home from "./pages/Home";
import ProductBrowsing from "./pages/ProductBrowsing";
import ProductDetails from "./pages/ProductDetails";
import Messages from "./pages/Messages";
import QuestionSubmitted from "./pages/QuestionSubmitted";
import Comparison from "./pages/Comparison";
import Orders from "./pages/Orders";
import Tracking from "./pages/Tracking";
import Returns from "./pages/Returns";
import ReturnConfirmation from "./pages/ReturnConfirmation";
import Settings from "./pages/Settings";
import Header from "./components/Header";

export default function App() {
  // Navigation & Screen View State
  const [currentView, setCurrentView] = useState("home"); // home | search | details | ask | submitted | compare | orders | track | return | returnConfirm | settings
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
  const [selectedForCompare, setSelectedForCompare] = useState(["prod-1"]);

  // Filters State
  const [filterPrice, setFilterPrice] = useState(false);
  const [filterPickup, setFilterPickup] = useState(false);
  const [filterOnline, setFilterOnline] = useState(false);
  const [filterFreeShipping, setFilterFreeShipping] = useState(false);

  // Q&A State
  const [questions, setQuestions] = useState([
    {
      q: "Are these comfortable for daily walking?",
      a: "I use them on daily walks and find them comfortable. — Verified Buyer ✓",
    },
  ]);
  const [newQuestionText, setNewQuestionText] = useState(
    "Do these shoes run true to size?",
  );
  const [lastSubmittedQuestion, setLastSubmittedQuestion] = useState("");

  // Orders & Return State
  const [orders, setOrders] = useState([
    {
      id: "#1042",
      productName: "Comfort Walking Shoes",
      store: "Sample Store",
      deliveryDate: "Delivered October 10",
      totalPaid: 59.99,
      status: "Delivered",
      returnInitiated: false,
      returnMethod: "Drop-off at local store",
      trackingCode: "TRK-98234710-SH",
    },
  ]);
  const [selectedReturnMethod, setSelectedReturnMethod] = useState("drop-off");

  // Navigation & Action Handlers
  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    setCurrentView("search");
  };

  const handleSelectProduct = (prod) => {
    setSelectedProduct(prod);
    setCurrentView("details");
  };

  const toggleCompareCheckbox = (id) => {
    if (selectedForCompare.includes(id)) {
      setSelectedForCompare(selectedForCompare.filter((item) => item !== id));
    } else {
      if (selectedForCompare.length < 2) {
        setSelectedForCompare([...selectedForCompare, id]);
      }
    }
  };

  const handlePostQuestion = (e) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;
    setLastSubmittedQuestion(newQuestionText);
    setQuestions([
      ...questions,
      {
        q: newQuestionText,
        a: "Status: Waiting for a buyer response",
      },
    ]);
    setCurrentView("submitted");
  };

  const handleConfirmReturn = () => {
    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === "#1042"
          ? {
              ...ord,
              returnInitiated: true,
              returnMethod:
                selectedReturnMethod === "drop-off"
                  ? "Store Drop-off"
                  : "Courier Pickup",
            }
          : ord,
      ),
    );
    setCurrentView("returnConfirm");
  };

  return (
    <div style={styles.container}>
      {/* Universal Desktop Header Navigation */}
      <Header currentView={currentView} setCurrentView={setCurrentView} />

      <main style={styles.main}>
        {/* VIEW 1: HOME PAGE */}
        {currentView === "home" && (
          <Home
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearchSubmit={handleSearchSubmit}
            setCurrentView={setCurrentView}
          />
        )}

        {/* VIEW 2: SEARCH RESULTS PAGE */}
        {currentView === "search" && (
          <ProductBrowsing
            searchQuery={searchQuery}
            filterPrice={filterPrice}
            setFilterPrice={setFilterPrice}
            filterPickup={filterPickup}
            setFilterPickup={setFilterPickup}
            filterOnline={filterOnline}
            setFilterOnline={setFilterOnline}
            filterFreeShipping={filterFreeShipping}
            setFilterFreeShipping={setFilterFreeShipping}
            selectedForCompare={selectedForCompare}
            toggleCompareCheckbox={toggleCompareCheckbox}
            handleSelectProduct={handleSelectProduct}
            setCurrentView={setCurrentView}
          />
        )}

        {/* VIEW 3: PRODUCT DETAILS PAGE */}
        {currentView === "details" && (
          <ProductDetails
            selectedProduct={selectedProduct}
            setCurrentView={setCurrentView}
          />
        )}

        {/* VIEW 4: ASK PREVIOUS BUYERS Q&A */}
        {currentView === "ask" && (
          <Messages
            questions={questions}
            newQuestionText={newQuestionText}
            setNewQuestionText={setNewQuestionText}
            handlePostQuestion={handlePostQuestion}
            setCurrentView={setCurrentView}
          />
        )}

        {/* VIEW 5: QUESTION SUBMITTED CONFIRMATION */}
        {currentView === "submitted" && (
          <QuestionSubmitted
            lastSubmittedQuestion={lastSubmittedQuestion}
            setCurrentView={setCurrentView}
          />
        )}

        {/* VIEW 6: PRODUCT COMPARISON MATRIX */}
        {currentView === "compare" && (
          <Comparison
            handleSelectProduct={handleSelectProduct}
            setCurrentView={setCurrentView}
          />
        )}

        {/* VIEW 7: MY ORDERS */}
        {currentView === "orders" && (
          <Orders orders={orders} setCurrentView={setCurrentView} />
        )}

        {/* VIEW 8: TRACK ORDER */}
        {currentView === "track" && (
          <Tracking setCurrentView={setCurrentView} />
        )}

        {/* VIEW 9: RETURN PURCHASE FLOW */}
        {currentView === "return" && (
          <Returns
            selectedReturnMethod={selectedReturnMethod}
            setSelectedReturnMethod={setSelectedReturnMethod}
            handleConfirmReturn={handleConfirmReturn}
            setCurrentView={setCurrentView}
          />
        )}

        {/* VIEW 10: RETURN CONFIRMATION WITH PRINTABLE LABEL */}
        {currentView === "returnConfirm" && (
          <ReturnConfirmation
            selectedReturnMethod={selectedReturnMethod}
            setCurrentView={setCurrentView}
          />
        )}

        {/* VIEW 11: SETTINGS */}
        {currentView === "settings" && (
          <Settings setCurrentView={setCurrentView} />
        )}
      </main>
    </div>
  );
}
