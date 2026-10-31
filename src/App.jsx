
import { useEffect, useState } from "react";
import { PRODUCTS } from "./data/products";
import { styles } from "./styles/styles";

import Home from "./pages/Home";
import ProductBrowsing from "./pages/ProductBrowsing";
import ProductDetails from "./pages/ProductDetails";
import BuyingOptions from "./pages/BuyingOptions";
import OrderConfirmation from "./pages/OrderConfirmation";
import Messages from "./pages/Messages";
import QuestionSubmitted from "./pages/QuestionSubmitted";
import Comparison from "./pages/Comparison";
import Orders from "./pages/Orders";
import Tracking from "./pages/Tracking";
import Returns from "./pages/Returns";
import ReturnConfirmation from "./pages/ReturnConfirmation";
import Settings from "./pages/Settings";
import Header from "./components/Header";

const DEMO_ORDERS_KEY = "shopping-hub-demo-orders";

const SAMPLE_ORDER = {
  id: "#1042",
  productName: "Comfort Walking Shoes",
  store: "Sample Store",
  deliveryDate: "Delivered October 10",
  totalPaid: 59.99,
  status: "Delivered",
  returnInitiated: false,
  returnMethod: "Drop-off at local store",
  trackingCode: "TRK-98234710-SH",
  method: "delivery",
  isDemo: false,
};

// Read previously created demo orders from the browser.
function loadDemoOrders() {
  try {
    const saved = localStorage.getItem(DEMO_ORDERS_KEY);
    const parsed = saved ? JSON.parse(saved) : [];

    return Array.isArray(parsed)
      ? parsed.filter((order) => order.isDemo === true)
      : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [currentView, setCurrentView] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);

  const [fulfillmentMethod, setFulfillmentMethod] = useState(null);
  const [activeOrderId, setActiveOrderId] = useState(null);

  const [selectedForCompare, setSelectedForCompare] = useState([]);

  // Filters
  const [filterPrice, setFilterPrice] = useState(false);
  const [filterPickup, setFilterPickup] = useState(false);
  const [filterOnline, setFilterOnline] = useState(false);
  const [filterFreeShipping, setFilterFreeShipping] = useState(false);

  // Buyer questions
  const [questions, setQuestions] = useState([
    {
      q: "Are these comfortable for daily walking?",
      a: "I use them on daily walks and find them comfortable. — Verified Buyer ✓",
    },
  ]);

  const [newQuestionText, setNewQuestionText] = useState(
    "Do these shoes run true to size?"
  );

  const [lastSubmittedQuestion, setLastSubmittedQuestion] =
    useState("");

  // Existing sample order
  const [sampleOrders, setSampleOrders] = useState([
    SAMPLE_ORDER,
  ]);

  // New demonstration orders
  const [demoOrders, setDemoOrders] = useState(loadDemoOrders);

  const [selectedReturnMethod, setSelectedReturnMethod] =
    useState("drop-off");

  // Save demo orders whenever they change.
  useEffect(() => {
    try {
      localStorage.setItem(
        DEMO_ORDERS_KEY,
        JSON.stringify(demoOrders)
      );
    } catch (error) {
      console.warn("Unable to save demo orders:", error);
    }
  }, [demoOrders]);

  // Show newest demo orders above the existing sample order.
  const orders = [...demoOrders, ...sampleOrders];

  const activeOrder = orders.find(
    (order) => order.id === activeOrderId
  );

  const handleNavigation = (view) => {
    if (view === "home") {
      setSelectedForCompare([]);
    }

    setCurrentView(view);
  };

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    setCurrentView("search");
  };

  const handleSelectProduct = (prod) => {
    setSelectedProduct(prod);
    setFulfillmentMethod(null);
    setActiveOrderId(null);
    setCurrentView("details");
  };

  const toggleCompareCheckbox = (id) => {
    setSelectedForCompare((current) => {
      if (current.includes(id)) {
        return current.filter((item) => item !== id);
      }

      if (current.length >= 2) {
        return current;
      }

      return [...current, id];
    });
  };

  const handleRemoveComparedProduct = (id) => {
    setSelectedForCompare((current) =>
      current.filter((item) => item !== id)
    );
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

  // Preserve the existing sample-order return workflow.
  const handleConfirmReturn = () => {
    setSampleOrders((prev) =>
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

  // Create a simulated order when the user continues
  // with a valid buying method.
  const handleBuyingOptionContinue = (method) => {
    if (method !== "pickup" && method !== "delivery") {
      return;
    }

    if (!selectedProduct.inStock) {
      return;
    }

    const pickupAvailable = selectedProduct.availability
      .toLowerCase()
      .includes("local pickup");

    const deliveryAvailable = Boolean(selectedProduct.shipping);

    if (method === "pickup" && !pickupAvailable) return;
    if (method === "delivery" && !deliveryAvailable) return;

    const freeShipping = selectedProduct.shipping
      .toLowerCase()
      .includes("free");

    const shippingCost =
      method === "pickup" || freeShipping ? 0 : null;

    const total =
      shippingCost === null
        ? null
        : selectedProduct.price + shippingCost;

    const newOrder = {
      id: `DEMO-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      store: selectedProduct.store,
      itemPrice: selectedProduct.price,
      shippingCost,
      totalPaid: total,
      method,
      status:
        method === "pickup"
          ? "Pending Pickup"
          : "Pending Delivery",
      createdAt: new Date().toISOString(),
      returnInitiated: false,
      isDemo: true,
    };

    setDemoOrders((previous) => [newOrder, ...previous]);

    setFulfillmentMethod(method);
    setActiveOrderId(newOrder.id);
    setCurrentView("orderConfirmation");
  };

  // Cancel a specific simulated order.
  const handleCancelOrder = (orderId) => {
    setDemoOrders((previous) =>
      previous.map((order) =>
        order.id === orderId &&
        order.status !== "Cancelled"
          ? {
              ...order,
              status: "Cancelled",
            }
          : order
      )
    );

    if (orderId === activeOrderId) {
      setActiveOrderId(null);
      setFulfillmentMethod(null);
    }
  };

  // Cancel from the confirmation screen.
  const handleCancelConfirmation = () => {
    if (activeOrderId) {
      handleCancelOrder(activeOrderId);
    }

    setCurrentView("buyingOptions");
  };

  return (
    <div style={styles.container}>
      <Header
        currentView={currentView}
        setCurrentView={handleNavigation}
      />

      <main style={styles.main}>
        {currentView === "home" && (
          <Home
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearchSubmit={handleSearchSubmit}
            setCurrentView={handleNavigation}
          />
        )}

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

        {currentView === "details" && (
          <ProductDetails
            selectedProduct={selectedProduct}
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === "buyingOptions" && (
          <BuyingOptions
            key={selectedProduct.id}
            selectedProduct={selectedProduct}
            setCurrentView={setCurrentView}
            onContinue={handleBuyingOptionContinue}
          />
        )}

        {currentView === "orderConfirmation" &&
          fulfillmentMethod &&
          activeOrder && (
            <OrderConfirmation
              selectedProduct={selectedProduct}
              method={fulfillmentMethod}
              order={activeOrder}
              setCurrentView={setCurrentView}
              onCancel={handleCancelConfirmation}
            />
          )}

        {currentView === "ask" && (
          <Messages
            questions={questions}
            newQuestionText={newQuestionText}
            setNewQuestionText={setNewQuestionText}
            handlePostQuestion={handlePostQuestion}
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === "submitted" && (
          <QuestionSubmitted
            lastSubmittedQuestion={lastSubmittedQuestion}
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === "compare" && (
          <Comparison
            selectedForCompare={selectedForCompare}
            handleSelectProduct={handleSelectProduct}
            onRemoveProduct={handleRemoveComparedProduct}
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === "orders" && (
          <Orders
            orders={orders}
            setCurrentView={setCurrentView}
            onCancelOrder={handleCancelOrder}
          />
        )}

        {currentView === "track" && (
          <Tracking setCurrentView={setCurrentView} />
        )}

        {currentView === "return" && (
          <Returns
            selectedReturnMethod={selectedReturnMethod}
            setSelectedReturnMethod={setSelectedReturnMethod}
            handleConfirmReturn={handleConfirmReturn}
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === "returnConfirm" && (
          <ReturnConfirmation
            selectedReturnMethod={selectedReturnMethod}
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === "settings" && (
          <Settings setCurrentView={setCurrentView} />
        )}
      </main>
    </div>
  );
}
