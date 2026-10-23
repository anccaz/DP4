import { styles } from "../styles/styles";

export default function Header({ currentView, setCurrentView }) {
  return (
    <header style={styles.nav}>
      <div style={styles.brand} onClick={() => setCurrentView("home")}>
        <div style={styles.logoCircle}></div>
        <span>Shopping Hub</span>
      </div>
      <nav style={styles.navLinks}>
        <span
          style={styles.navLink(currentView === "home")}
          onClick={() => setCurrentView("home")}
        >
          Home
        </span>
        <span
          style={styles.navLink(
            currentView === "orders" ||
              currentView === "track" ||
              currentView === "return" ||
              currentView === "returnConfirm",
          )}
          onClick={() => setCurrentView("orders")}
        >
          My Orders
        </span>
        <span
          style={styles.navLink(
            currentView === "ask" || currentView === "submitted",
          )}
          onClick={() => setCurrentView("ask")}
        >
          Messages
        </span>
        <span
          style={styles.navLink(currentView === "settings")}
          onClick={() => setCurrentView("settings")}
        >
          Settings
        </span>
      </nav>
    </header>
  );
}
