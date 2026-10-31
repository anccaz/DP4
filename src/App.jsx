
import { useEffect, useState } from "react";
import { PRODUCTS } from "./data/products";
import { styles } from "./styles/styles";

import Home from "./pages/Home";
import ProductBrowsing from "./pages/ProductBrowsing";
import ProductDetails from "./pages/ProductDetails";
import BuyingOptions from "./pages/BuyingOptions";
import PickupLocation from "./pages/PickupLocation";
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

const ORDERS_KEY = "shopping-hub-demo-orders";

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

function loadSavedOrders() {
  try {
    const saved = localStorage.getItem(ORDERS_KEY);
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
  const [selectedProduct, setSelectedProduct] = useState(
    PRODUCTS[0]
  );

  // Buying and fulfillment
  const [fulfillmentMethod, setFulfillmentMethod] =
    useState(null);
  const [activeOrderId, setActiveOrderId] = useState(null);

  // Product comparison
  const [selectedForCompare, setSelectedForCompare] =
    useState([]);

  // Filters
  const [filterPrice, setFilterPrice] = useState(false);
  const [filterPickup, setFilterPickup] = useState(false);
  const [filterOnline, setFilterOnline] = useState(false);
  const [filterFreeShipping, setFilterFreeShipping] =
    useState(false);

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

  // Orders
  const [sampleOrders, setSampleOrders] = useState([
    SAMPLE_ORDER,
  ]);

  const [demoOrders, setDemoOrders] = useState(
    loadSavedOrders
  );

  const [selectedReturnMethod, setSelectedReturnMethod] =
    useState("drop-off");

  // Persist newly created orders locally.
  useEffect(() => {
    try {
      localStorage.setItem(
        ORDERS_KEY,
        JSON.stringify(demoOrders)
      );
    } catch (error) {
      console.warn("Could not save orders:", error);
    }
  }, [demoOrders]);

  const orders = [...demoOrders, ...sampleOrders];

  const activeOrder = orders.find(
    (order) => order.id === activeOrderId
  );

  // General navigation
  const handleNavigation = (view) => {
    if (view === "home") {
      setSelectedForCompare([]);
    }

    setCurrentView(view);
  };

  // Product search
  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    setCurrentView("search");
  };

  // Product details
  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setFulfillmentMethod(null);
    setActiveOrderId(null);
    setCurrentView("details");
  };

  // Product comparison
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

  // Buyer questions
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

  // Existing returns workflow
  const handleConfirmReturn = () => {
    setSampleOrders((previous) =>
      previous.map((order) =>
        order.id === "#1042"
          ? {
              ...order,
              returnInitiated: true,
              returnMethod:
                selectedReturnMethod === "drop-off"
                  ? "Store Drop-off"
                  : "Courier Pickup",
            }
          : order
      )
    );

    setCurrentView("returnConfirm");
  };

  // Create an order only after required information
  // has been selected.
  const createOrder = (method, pickupStore = null) => {
    if (!selectedProduct.inStock) return;

    if (method !== "pickup" && method !== "delivery") {
      return;
    }

    const pickupAvailable = selectedProduct.availability
      .toLowerCase()
      .includes("local pickup");

    const deliveryAvailable = Boolean(
      selectedProduct.shipping
    );

    if (method === "pickup" && !pickupAvailable) return;
    if (method === "delivery" && !deliveryAvailable) return;

    // Pickup requires a selected store.
    if (method === "pickup" && !pickupStore) return;

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
      id: `SH-${Date.now()}-${Math.floor(
        Math.random() * 10000
      )}`,
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

      // Selected pickup information
      pickupStore: pickupStore
        ? {
            id: pickupStore.id,
            name: pickupStore.name,
            area: pickupStore.area,
            hours: pickupStore.hours,
            pickupEstimate: pickupStore.pickupEstimate,
            pickupDate: pickupStore.pickupDate,
          }
        : null,

      returnInitiated: false,

      // Internal flag used to distinguish locally
      // created orders from the existing sample order.
      isDemo: true,
    };

    setDemoOrders((previous) => [
      newOrder,
      ...previous,
    ]);

    setFulfillmentMethod(method);
    setActiveOrderId(newOrder.id);
    setCurrentView("orderConfirmation");
  };

  // Called when continuing from Buying Options.
  const handleBuyingOptionContinue = (method) => {
    if (method === "pickup") {
      const pickupAvailable = selectedProduct.availability
        .toLowerCase()
        .includes("local pickup");

      if (!selectedProduct.inStock || !pickupAvailable) {
        return;
      }

      setFulfillmentMethod("pickup");
      setCurrentView("pickupLocation");
      return;
    }

    if (method === "delivery") {
      createOrder("delivery");
    }
  };

  // Called after choosing a pickup location.
  const handlePickupLocationContinue = (pickupStore) => {
    createOrder("pickup", pickupStore);
  };

  // Cancel a locally created order.
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

    setCurrentView("orders");
  };

  return (
    <div style={styles.container}>
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

        {/* Browsing */}
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
            onContinue={handleBuyingOptionContinue}
          />
        )}

        {/* Pickup store selection */}
        {currentView === "pickupLocation" && (
          <PickupLocation
            key={selectedProduct.id}
            selectedProduct={selectedProduct}
            onContinue={handlePickupLocationContinue}
            setCurrentView={setCurrentView}
          />
        )}

        {/* Order confirmation */}
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

        {/* Buyer messages */}
        {currentView === "ask" && (
          <Messages
            questions={questions}
            newQuestionText={newQuestionText}
            setNewQuestionText={setNewQuestionText}
            handlePostQuestion={handlePostQuestion}
            setCurrentView={setCurrentView}
          />
        )}

        {/* Question submitted */}
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

        {/* My Orders */}
        {currentView === "orders" && (
          <Orders
            orders={orders}
            setCurrentView={setCurrentView}
            onCancelOrder={handleCancelOrder}
          />
        )}

        {/* Tracking */}
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
          <Settings
            setCurrentView={setCurrentView}
          />
        )}
      </main>
    </div>
  );
}
