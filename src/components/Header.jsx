import { styles } from "../styles/styles";

export default function Header({
  currentView,
  setCurrentView,
  isLoggedIn,
  onLogout,
}) {
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
          style={styles.navLink(currentView === "myMessages")}
          onClick={() => setCurrentView("myMessages")}
        >
          Messages
        </span>
        {isLoggedIn ? (
        <span
         style={styles.navLink(false)}
         onClick={onLogout}
        >
        Log Out
       </span>
        ) : (
        <span
          style={styles.navLink(currentView === "login")}
          onClick={() => setCurrentView("login")}
       >
         Login
        </span>
)}
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
