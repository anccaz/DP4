
import { useState } from "react";
import { PRODUCTS } from "./data/products";
import { styles } from "./styles/styles";

import Home from "./pages/Home";
import ProductBrowsing from "./pages/ProductBrowsing";
import ProductDetails from "./pages/ProductDetails";
import BuyingOptions from "./pages/BuyingOptions";
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
  // Navigation and current product information
  const [currentView, setCurrentView] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);

  // Start with no products selected for comparison
  const [selectedForCompare, setSelectedForCompare] = useState([]);

  // Product filters
  const [filterPrice, setFilterPrice] = useState(false);
  const [filterPickup, setFilterPickup] = useState(false);
  const [filterOnline, setFilterOnline] = useState(false);
  const [filterFreeShipping, setFilterFreeShipping] = useState(false);

  // Questions and answers
  const [questions, setQuestions] = useState([
    {
      q: "Are these comfortable for daily walking?",
      a: "I use them on daily walks and find them comfortable. — Verified Buyer ✓",
    },
  ]);

  const [newQuestionText, setNewQuestionText] = useState(
    "Do these shoes run true to size?"
  );

  const [lastSubmittedQuestion, setLastSubmittedQuestion] = useState("");

  // Orders and returns
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

  const [selectedReturnMethod, setSelectedReturnMethod] =
    useState("drop-off");

  // Clear comparison selections when returning Home
  const handleNavigation = (view) => {
    if (view === "home") {
      setSelectedForCompare([]);
    }

    setCurrentView(view);
  };

  // Open the product search page
  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    setCurrentView("search");
  };

  // Open details for the chosen product
  const handleSelectProduct = (prod) => {
    setSelectedProduct(prod);
    setCurrentView("details");
  };

  // Allow users to select or deselect up to two products
  const toggleCompareCheckbox = (id) => {
    setSelectedForCompare((current) => {
      if (current.includes(id)) {
        return current.filter((item) => item !== id);
      }

      // Do not allow more than two selected products
      if (current.length >= 2) {
        return current;
      }

      return [...current, id];
    });
  };

  // Remove a product from the comparison page
  const handleRemoveComparedProduct = (id) => {
    setSelectedForCompare((current) =>
      current.filter((item) => item !== id)
    );
  };

  // Submit a question about a product
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

  // Confirm a return for the sample order
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
          : ord
      )
    );

    setCurrentView("returnConfirm");
  };

  return (
    <div style={styles.container}>
      {/* Main navigation */}
      <Header
        currentView={currentView}
        setCurrentView={handleNavigation}
      />

      <main style={styles.main}>
        {/* Home */}
        {currentView === "home" && (
          <Home
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearchSubmit={handleSearchSubmit}
            setCurrentView={handleNavigation}
          />
        )}

        {/* Product browsing */}
        {currentView === "search" && (
          <ProductBrowsing
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
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

        {/* Product details */}
        {currentView === "details" && (
          <ProductDetails
            selectedProduct={selectedProduct}
            setCurrentView={setCurrentView}
          />
        )}

        {/* Buying options */}
        {currentView === "buyingOptions" && (
          <BuyingOptions
            key={selectedProduct.id}
            selectedProduct={selectedProduct}
            setCurrentView={setCurrentView}
          />
        )}

        {/* Messages */}
        {currentView === "ask" && (
          <Messages
            questions={questions}
            newQuestionText={newQuestionText}
            setNewQuestionText={setNewQuestionText}
            handlePostQuestion={handlePostQuestion}
            setCurrentView={setCurrentView}
          />
        )}

        {/* Question confirmation */}
        {currentView === "submitted" && (
          <QuestionSubmitted
            lastSubmittedQuestion={lastSubmittedQuestion}
            setCurrentView={setCurrentView}
          />
        )}

        {/* Product comparison */}
        {currentView === "compare" && (
          <Comparison
            selectedForCompare={selectedForCompare}
            handleSelectProduct={handleSelectProduct}
            onRemoveProduct={handleRemoveComparedProduct}
            setCurrentView={setCurrentView}
          />
        )}

        {/* My orders */}
        {currentView === "orders" && (
          <Orders
            orders={orders}
            setCurrentView={setCurrentView}
          />
        )}

        {/* Order tracking */}
        {currentView === "track" && (
          <Tracking setCurrentView={setCurrentView} />
        )}

        {/* Returns */}
        {currentView === "return" && (
          <Returns
            selectedReturnMethod={selectedReturnMethod}
            setSelectedReturnMethod={setSelectedReturnMethod}
            handleConfirmReturn={handleConfirmReturn}
            setCurrentView={setCurrentView}
          />
        )}

        {/* Return confirmation */}
        {currentView === "returnConfirm" && (
          <ReturnConfirmation
            selectedReturnMethod={selectedReturnMethod}
            setCurrentView={setCurrentView}
          />
        )}

        {/* Settings */}
        {currentView === "settings" && (
          <Settings setCurrentView={setCurrentView} />
        )}
      </main>
    </div>
  );
}
