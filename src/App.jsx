
import { useEffect, useState } from "react";
import { PRODUCTS } from "./data/products";
import { styles } from "./styles/styles";

import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductBrowsing from "./pages/ProductBrowsing";
import ProductDetails from "./pages/ProductDetails";
import BuyingOptions from "./pages/BuyingOptions";
import PickupLocation from "./pages/PickupLocation";
import OrderConfirmation from "./pages/OrderConfirmation";
import Messages from "./pages/Messages";
import QuestionSubmitted from "./pages/QuestionSubmitted";
import MyMessages from "./pages/MyMessages";
import {
  SEED_QUESTIONS,
  WAITING_STATUS,
} from "./data/questions";
import Comparison from "./pages/Comparison";
import Orders from "./pages/Orders";
import Tracking from "./pages/Tracking";
import Returns from "./pages/Returns";
import ReturnConfirmation from "./pages/ReturnConfirmation";
import Settings from "./pages/Settings";
import { TEXT_SIZES } from "./data/settings";
import Header from "./components/Header";

const ORDERS_KEY = "shopping-hub-demo-orders";
const SAMPLE_ORDER_KEY = "shopping-hub-sample-orders";
const PREFERENCES_KEY = "shopping-hub-preferences";
const ACCOUNT_KEY = "shopping-hub-account";
const QUESTIONS_KEY = "shopping-hub-my-questions";
const NAVIGATION_KEY = "shopping-hub-navigation";

const DEFAULT_PREFERENCES = {
  textSize: "standard",
  notifications: "minimal",
  recommendations: true,
};

const DEFAULT_ACCOUNT = {
  name: "Demo Shopper",
  email: "demo@shoppinghub.com",
  phone: "",
};

const SAMPLE_ORDER = {
  id: "#1042",
  productName: "Comfort Walking Shoes",
  store: "Sample Store",
  deliveryDate: "Delivered October 10",
  totalPaid: 59.99,
  status: "Delivered",
  returnInitiated: false,
  returnMethod: null,
  returnReference: null,
  trackingCode: "TRK-98234710-SH",
  method: "delivery",
  isDemo: false,
};

const VALID_VIEWS = [
  "home",
  "login",
  "search",
  "details",
  "buyingOptions",
  "pickupLocation",
  "orderConfirmation",
  "ask",
  "myMessages",
  "submitted",
  "compare",
  "orders",
  "track",
  "return",
  "returnConfirm",
  "settings",
];

function loadSaved(key, defaults) {
  try {
    const saved = localStorage.getItem(key);
    const parsed = saved ? JSON.parse(saved) : null;

    return parsed && typeof parsed === "object"
      ? { ...defaults, ...parsed }
      : defaults;
  } catch {
    return defaults;
  }
}

function loadArray(key, fallback = []) {
  try {
    const saved = localStorage.getItem(key);
    const parsed = saved ? JSON.parse(saved) : null;
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Could not save ${key}:`, error);
  }
}

function loadNavigation() {
  try {
    const saved = sessionStorage.getItem(NAVIGATION_KEY);
    const parsed = saved ? JSON.parse(saved) : {};

    return {
      currentView: VALID_VIEWS.includes(parsed.currentView)
        ? parsed.currentView
        : "home",
      selectedProductId: parsed.selectedProductId,
      activeOrderId: parsed.activeOrderId ?? null,
      fulfillmentMethod: parsed.fulfillmentMethod ?? null,
      selectedReturnOrderId:
        parsed.selectedReturnOrderId ?? null,
      selectedForCompare: Array.isArray(
        parsed.selectedForCompare
      )
        ? parsed.selectedForCompare.slice(0, 2)
        : [],
      searchQuery: parsed.searchQuery ?? "",
    };
  } catch {
    return {
      currentView: "home",
      selectedProductId: PRODUCTS[0].id,
      activeOrderId: null,
      fulfillmentMethod: null,
      selectedReturnOrderId: null,
      selectedForCompare: [],
      searchQuery: "",
    };
  }
}

function isReturnEligible(order) {
  return Boolean(
    order &&
    order.status === "Delivered" &&
    !order.returnInitiated
  );
}

export default function App() {
  const [initialNavigation] = useState(loadNavigation);

  const [currentView, setCurrentView] = useState(
    initialNavigation.currentView
  );

  const [
    showLogoutConfirmation,
    setShowLogoutConfirmation,
  ] = useState(false);

  const [logoutMessage, setLogoutMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [searchQuery, setSearchQuery] = useState(
    initialNavigation.searchQuery
  );

  const [selectedProduct, setSelectedProduct] = useState(
    () =>
      PRODUCTS.find(
        (product) =>
          product.id === initialNavigation.selectedProductId
      ) || PRODUCTS[0]
  );

  // Buying and fulfillment
  const [fulfillmentMethod, setFulfillmentMethod] = useState(
    initialNavigation.fulfillmentMethod
  );

  const [activeOrderId, setActiveOrderId] = useState(
    initialNavigation.activeOrderId
  );

  // Product comparison
  const [selectedForCompare, setSelectedForCompare] = useState(
    initialNavigation.selectedForCompare
  );

  // Search filters
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filterPickup, setFilterPickup] = useState(false);
  const [filterOnline, setFilterOnline] = useState(false);
  const [filterFreeShipping, setFilterFreeShipping] =
    useState(false);
  const [filterInStock, setFilterInStock] = useState(false);
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterRating, setFilterRating] = useState(false);

  // Buyer questions
  const [userQuestions, setUserQuestions] = useState(() => {
    const saved = loadSaved(QUESTIONS_KEY, { items: [] });
    return Array.isArray(saved.items) ? saved.items : [];
  });

  useEffect(() => {
    save(QUESTIONS_KEY, { items: userQuestions });
  }, [userQuestions]);

  const productQuestions = [
    ...SEED_QUESTIONS,
    ...userQuestions,
  ].filter(
    (question) => question.productId === selectedProduct.id
  );

  const [newQuestionText, setNewQuestionText] = useState("");
  const [lastSubmittedQuestion, setLastSubmittedQuestion] =
    useState("");

  // Orders
  const [sampleOrders, setSampleOrders] = useState(() => {
    const saved = loadArray(SAMPLE_ORDER_KEY, [SAMPLE_ORDER]);
    const existing = saved.find(
      (order) => order.id === SAMPLE_ORDER.id
    );

    return [existing || SAMPLE_ORDER];
  });

  const [demoOrders, setDemoOrders] = useState(() =>
    loadArray(ORDERS_KEY).filter(
      (order) => order.isDemo === true
    )
  );

  // Returns
  const [selectedReturnOrderId, setSelectedReturnOrderId] =
    useState(initialNavigation.selectedReturnOrderId);

  const [selectedReturnMethod, setSelectedReturnMethod] =
    useState("drop-off");

  useEffect(() => {
    save(ORDERS_KEY, demoOrders);
  }, [demoOrders]);

  useEffect(() => {
    save(SAMPLE_ORDER_KEY, sampleOrders);
  }, [sampleOrders]);

  // Settings and account
  const [preferences, setPreferences] = useState(() =>
    loadSaved(PREFERENCES_KEY, DEFAULT_PREFERENCES)
  );

  const [account, setAccount] = useState(() =>
    loadSaved(ACCOUNT_KEY, DEFAULT_ACCOUNT)
  );

  useEffect(() => {
    save(PREFERENCES_KEY, preferences);
  }, [preferences]);

  useEffect(() => {
    save(ACCOUNT_KEY, account);
  }, [account]);

  const textZoom =
    TEXT_SIZES[preferences.textSize]?.zoom ??
    TEXT_SIZES.standard.zoom;

  const orders = [...demoOrders, ...sampleOrders];

  const activeOrder = orders.find(
    (order) => order.id === activeOrderId
  );

  const selectedReturnOrder = orders.find(
    (order) => order.id === selectedReturnOrderId
  );

  // Save navigation context across refreshes
  useEffect(() => {
    try {
      sessionStorage.setItem(
        NAVIGATION_KEY,
        JSON.stringify({
          currentView,
          selectedProductId: selectedProduct.id,
          activeOrderId,
          fulfillmentMethod,
          selectedReturnOrderId,
          selectedForCompare,
          searchQuery,
        })
      );
    } catch (error) {
      console.warn("Could not save navigation:", error);
    }
  }, [
    currentView,
    selectedProduct,
    activeOrderId,
    fulfillmentMethod,
    selectedReturnOrderId,
    selectedForCompare,
    searchQuery,
  ]);

  // Validate restored pages
  useEffect(() => {
    if (
      currentView === "orderConfirmation" &&
      (!activeOrder || !fulfillmentMethod)
    ) {
      setCurrentView("orders");
    }

    if (
      ["return", "returnConfirm"].includes(currentView) &&
      !selectedReturnOrder
    ) {
      setCurrentView("orders");
    }

    if (
      currentView === "returnConfirm" &&
      selectedReturnOrder &&
      !selectedReturnOrder.returnInitiated
    ) {
      setCurrentView("orders");
    }

    if (
      currentView === "return" &&
      selectedReturnOrder &&
      !isReturnEligible(selectedReturnOrder)
    ) {
      setCurrentView("orders");
    }
  }, [
    currentView,
    activeOrder,
    fulfillmentMethod,
    selectedReturnOrder,
  ]);

  // Navigation
  const handleNavigation = (view) => {
    setLogoutMessage("");

    if (view === "home") {
      setSelectedForCompare([]);
    }

    if (
      ["return", "returnConfirm"].includes(view) &&
      !selectedReturnOrderId
    ) {
      setCurrentView("orders");
      return;
    }

    // Start with a fresh question when opening the form
    if (view === "ask") {
      setNewQuestionText("");
    }

    setCurrentView(view);
  };

  // Account
  const handleLogin = (email) => {
    setIsLoggedIn(true);
    setLogoutMessage("");

    setAccount((previous) => ({
      ...previous,
      email,
    }));

    setCurrentView("home");
  };

  const handleLogout = () => {
    setShowLogoutConfirmation(true);
  };

  const cancelLogout = () => {
    setShowLogoutConfirmation(false);
  };

  const confirmLogout = () => {
    setIsLoggedIn(false);
    setShowLogoutConfirmation(false);
    setLogoutMessage("You have successfully signed out!");
    setCurrentView("home");
  };

  // Search
  const handleSearchSubmit = (event) => {
    if (event) event.preventDefault();
    setCurrentView("search");
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setFulfillmentMethod(null);
    setActiveOrderId(null);
    setNewQuestionText("");
    setCurrentView("details");
  };

  // Comparison
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

  // Submit questions for any selected product
  const handlePostQuestion = (event) => {
    event.preventDefault();

    const text = newQuestionText.trim();

    if (!text || !selectedProduct) {
      return;
    }

    const newQuestion = {
      id: `Q-${Date.now()}-${Math.floor(
        Math.random() * 10000
      )}`,
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      q: text,
      answer: null,
      status: WAITING_STATUS,
      postedAt: new Date().toISOString(),
      isUser: true,
    };

    setLastSubmittedQuestion(text);

    setUserQuestions((previous) => [
      ...previous,
      newQuestion,
    ]);

    setNewQuestionText("");
    setCurrentView("submitted");
  };

  const handleDeleteQuestion = (questionId) => {
    setUserQuestions((previous) =>
      previous.filter(
        (question) => question.id !== questionId
      )
    );
  };

  // Returns
  const handleStartReturn = (orderId) => {
    const order = orders.find(
      (item) => item.id === orderId
    );

    if (!isReturnEligible(order)) return;

    setSelectedReturnOrderId(orderId);
    setSelectedReturnMethod("drop-off");
    setCurrentView("return");
  };

  const handleViewReturn = (orderId) => {
    const order = orders.find(
      (item) => item.id === orderId
    );

    if (!order?.returnInitiated) return;

    setSelectedReturnOrderId(orderId);
    setSelectedReturnMethod(
      order.returnMethod === "Courier Pickup"
        ? "pickup"
        : "drop-off"
    );
    setCurrentView("returnConfirm");
  };

  const handleConfirmReturn = () => {
    if (!isReturnEligible(selectedReturnOrder)) return;

    const orderId = selectedReturnOrder.id;

    const returnMethod =
      selectedReturnMethod === "drop-off"
        ? "Store Drop-off"
        : "Courier Pickup";

    const returnReference = `RMA-${Date.now()}-${Math.floor(
      Math.random() * 10000
    )}`;

    const updateOrder = (order) =>
      order.id === orderId && isReturnEligible(order)
        ? {
            ...order,
            returnInitiated: true,
            returnMethod,
            returnReference,
            returnRequestedAt: new Date().toISOString(),
          }
        : order;

    setSampleOrders((previous) =>
      previous.map(updateOrder)
    );

    setDemoOrders((previous) =>
      previous.map(updateOrder)
    );

    setCurrentView("returnConfirm");
  };

  const handleMarkDelivered = (orderId) => {
    setDemoOrders((previous) =>
      previous.map((order) =>
        order.id === orderId &&
        ["Pending Delivery", "Pending Pickup"].includes(
          order.status
        )
          ? {
              ...order,
              status: "Delivered",
              deliveryDate: `Delivered ${new Date().toLocaleDateString()}`,
            }
          : order
      )
    );
  };

  // Buying
  const createOrder = (method, pickupStore = null) => {
    if (!selectedProduct.inStock) return;

    if (!["pickup", "delivery"].includes(method)) {
      return;
    }

    if (
      method === "pickup" &&
      !selectedProduct.localPickup
    ) {
      return;
    }

    if (
      method === "delivery" &&
      !selectedProduct.onlineDelivery
    ) {
      return;
    }

    if (method === "pickup" && !pickupStore) {
      return;
    }

    const freeShipping = selectedProduct.shipping
      .toLowerCase()
      .includes("free");

    const shippingCost =
      method === "pickup" || freeShipping
        ? 0
        : null;

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
      returnMethod: null,
      returnReference: null,
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

  const handleBuyingOptionContinue = (method) => {
    if (method === "pickup") {
      if (
        !selectedProduct.inStock ||
        !selectedProduct.localPickup
      ) {
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

  const handlePickupLocationContinue = (pickupStore) => {
    createOrder("pickup", pickupStore);
  };

  const handleCancelOrder = (orderId) => {
    setDemoOrders((previous) =>
      previous.map((order) =>
        order.id === orderId &&
        ["Pending Pickup", "Pending Delivery"].includes(
          order.status
        )
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

  const handleCancelConfirmation = () => {
    if (activeOrderId) {
      handleCancelOrder(activeOrderId);
    }

    setCurrentView("orders");
  };

  return (
    <div
      style={{
        ...styles.container,
        zoom: textZoom,
      }}
    >
      <Header
        currentView={currentView}
        setCurrentView={handleNavigation}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />

      {logoutMessage && (
        <div
          role="status"
          style={{
            backgroundColor: "#dcfce7",
            color: "#166534",
            padding: "12px",
            textAlign: "center",
            borderRadius: "8px",
            margin: "12px auto",
            maxWidth: "500px",
          }}
        >
          {logoutMessage}
        </div>
      )}

      {showLogoutConfirmation && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="logout-title"
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "12px",
              width: "350px",
              maxWidth: "calc(100vw - 48px)",
              boxShadow:
                "0 4px 15px rgba(0,0,0,0.2)",
            }}
          >
            <h2 id="logout-title">Sign Out?</h2>

            <p>
              Are you sure you want to sign out of your
              Shopping Hub account?
            </p>

            <div
              style={{
                display: "flex",
                gap: "12px",
                marginTop: "24px",
              }}
            >
              <button
                onClick={cancelLogout}
                style={{
                  ...styles.grayBtn,
                  flex: 1,
                }}
              >
                Cancel
              </button>

              <button
                onClick={confirmLogout}
                style={{
                  ...styles.yellowBtn,
                  flex: 1,
                }}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      <main style={styles.main}>
        {currentView === "home" && (
          <Home
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearchSubmit={handleSearchSubmit}
            setCurrentView={handleNavigation}
          />
        )}

        {currentView === "login" && (
          <Login
            setCurrentView={handleNavigation}
            onLogin={handleLogin}
          />
        )}

        {currentView === "search" && (
          <ProductBrowsing
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            filterPickup={filterPickup}
            setFilterPickup={setFilterPickup}
            filterOnline={filterOnline}
            setFilterOnline={setFilterOnline}
            filterFreeShipping={filterFreeShipping}
            setFilterFreeShipping={setFilterFreeShipping}
            filterInStock={filterInStock}
            setFilterInStock={setFilterInStock}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            filterRating={filterRating}
            setFilterRating={setFilterRating}
            selectedForCompare={selectedForCompare}
            toggleCompareCheckbox={toggleCompareCheckbox}
            handleSelectProduct={handleSelectProduct}
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === "details" && (
          <ProductDetails
            selectedProduct={selectedProduct}
            setCurrentView={handleNavigation}
          />
        )}

        {currentView === "buyingOptions" && (
          <BuyingOptions
            key={selectedProduct.id}
            selectedProduct={selectedProduct}
            setCurrentView={handleNavigation}
            onContinue={handleBuyingOptionContinue}
          />
        )}

        {currentView === "pickupLocation" && (
          <PickupLocation
            key={selectedProduct.id}
            selectedProduct={selectedProduct}
            onContinue={handlePickupLocationContinue}
            setCurrentView={handleNavigation}
          />
        )}

        {currentView === "orderConfirmation" &&
          fulfillmentMethod &&
          activeOrder && (
            <OrderConfirmation
              selectedProduct={selectedProduct}
              method={fulfillmentMethod}
              order={activeOrder}
              setCurrentView={handleNavigation}
              onCancel={handleCancelConfirmation}
            />
          )}

        {currentView === "ask" && (
          <Messages
            selectedProduct={selectedProduct}
            questions={productQuestions}
            newQuestionText={newQuestionText}
            setNewQuestionText={setNewQuestionText}
            handlePostQuestion={handlePostQuestion}
            setCurrentView={handleNavigation}
          />
        )}

        {currentView === "myMessages" && (
          <MyMessages
            questions={userQuestions}
            handleSelectProduct={handleSelectProduct}
            onDeleteQuestion={handleDeleteQuestion}
            setCurrentView={handleNavigation}
          />
        )}

        {currentView === "submitted" && (
          <QuestionSubmitted
            lastSubmittedQuestion={lastSubmittedQuestion}
            setCurrentView={handleNavigation}
          />
        )}

        {currentView === "compare" && (
          <Comparison
            selectedForCompare={selectedForCompare}
            handleSelectProduct={handleSelectProduct}
            onRemoveProduct={handleRemoveComparedProduct}
            setCurrentView={handleNavigation}
          />
        )}

        {currentView === "orders" && (
          <Orders
            orders={orders}
            setCurrentView={handleNavigation}
            onCancelOrder={handleCancelOrder}
            onMarkDelivered={handleMarkDelivered}
            onStartReturn={handleStartReturn}
            onViewReturn={handleViewReturn}
          />
        )}

        {currentView === "track" && (
          <Tracking
            setCurrentView={handleNavigation}
          />
        )}

        {currentView === "return" &&
          selectedReturnOrder && (
            <Returns
              order={selectedReturnOrder}
              selectedReturnMethod={selectedReturnMethod}
              setSelectedReturnMethod={setSelectedReturnMethod}
              handleConfirmReturn={handleConfirmReturn}
              setCurrentView={handleNavigation}
            />
          )}

        {currentView === "returnConfirm" &&
          selectedReturnOrder?.returnInitiated && (
            <ReturnConfirmation
              order={selectedReturnOrder}
              setCurrentView={handleNavigation}
            />
          )}

        {currentView === "settings" && (
          <Settings
            setCurrentView={handleNavigation}
            preferences={preferences}
            setPreferences={setPreferences}
            account={account}
            setAccount={setAccount}
          />
        )}
      </main>
    </div>
  );
}
