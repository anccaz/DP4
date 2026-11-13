import { useState } from "react";
import { styles } from "../styles/styles";
import { TEXT_SIZES } from "../data/settings";

const NOTIFICATION_OPTIONS = {
  all: "All updates",
  minimal: "Minimal (orders only)",
  none: "None",
};

const sectionHeading = {
  fontSize: "20px",
  fontWeight: "700",
  marginTop: 0,
  marginBottom: "20px",
};

const labelStyle = {
  display: "block",
  fontWeight: "600",
  marginBottom: "8px",
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "14px",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
  fontSize: "15px",
  marginBottom: "20px",
  fontFamily: "inherit",
};

const optionRow = (selected) => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  backgroundColor: selected ? "#fff7e6" : "#f1f5f9",
  border: selected ? "2px solid #fab633" : "2px solid transparent",
  padding: "14px 20px",
  borderRadius: "10px",
  fontSize: "16px",
  fontWeight: "500",
  cursor: "pointer",
});

function StatusMessage({ status }) {
  if (!status) return null;

  return (
    <p
      role="status"
      style={{
        marginTop: "16px",
        marginBottom: 0,
        color: status.type === "error" ? "#b91c1c" : "#15803d",
        fontWeight: "500",
      }}
    >
      {status.text}
    </p>
  );
}

export default function Settings({
  setCurrentView,
  preferences,
  setPreferences,
  account,
  setAccount,
}) {
  // Account details form (saved only when the user clicks Save).
  const [name, setName] = useState(account.name);
  const [email, setEmail] = useState(account.email);
  const [phone, setPhone] = useState(account.phone);
  const [accountStatus, setAccountStatus] = useState(null);

  const updatePreference = (key, value) => {
    setPreferences((previous) => ({ ...previous, [key]: value }));
  };

  const handleSaveAccount = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setAccountStatus({ type: "error", text: "Please enter your name." });
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setAccountStatus({
        type: "error",
        text: "Please enter a valid email address.",
      });
      return;
    }

    setAccount((previous) => ({
      ...previous,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
    }));
    setAccountStatus({ type: "success", text: "Account details saved." });
  };

  return (
    <div>
      <span style={styles.subLabel}>Settings</span>
      <h1 style={styles.pageHeading}>Your preferences</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* Display and notifications */}
        <div style={styles.card}>
          <h2 style={sectionHeading}>Display and notifications</h2>

          <fieldset style={{ border: "none", padding: 0, margin: "0 0 28px" }}>
            <legend style={{ ...labelStyle, padding: 0 }}>Text size</legend>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {Object.entries(TEXT_SIZES).map(([key, option]) => (
                <label key={key} style={optionRow(preferences.textSize === key)}>
                  <input
                    type="radio"
                    name="textSize"
                    value={key}
                    checked={preferences.textSize === key}
                    onChange={() => updatePreference("textSize", key)}
                  />
                  <span style={{ fontSize: `${16 * option.zoom}px` }}>
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset style={{ border: "none", padding: 0, margin: "0 0 28px" }}>
            <legend style={{ ...labelStyle, padding: 0 }}>Notifications</legend>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {Object.entries(NOTIFICATION_OPTIONS).map(([key, label]) => (
                <label
                  key={key}
                  style={optionRow(preferences.notifications === key)}
                >
                  <input
                    type="radio"
                    name="notifications"
                    value={key}
                    checked={preferences.notifications === key}
                    onChange={() => updatePreference("notifications", key)}
                  />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>

          <label style={optionRow(preferences.recommendations)}>
            <input
              type="checkbox"
              checked={preferences.recommendations}
              onChange={(e) =>
                updatePreference("recommendations", e.target.checked)
              }
            />
            Show personalized product recommendations
          </label>

          <p style={{ color: "#64748b", marginBottom: 0 }}>
            Display and notification changes are saved automatically.
          </p>
        </div>

        {/* Account details */}
        <div style={styles.card}>
          <h2 style={sectionHeading}>Login information</h2>

          <form onSubmit={handleSaveAccount}>
            <label style={labelStyle} htmlFor="settings-name">
              Full name
            </label>
            <input
              id="settings-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
            />

            <label style={labelStyle} htmlFor="settings-email">
              Email address
            </label>
            <input
              id="settings-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />

            <label style={labelStyle} htmlFor="settings-phone">
              Phone number (optional)
            </label>
            <input
              id="settings-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={inputStyle}
            />

            <button type="submit" style={styles.yellowBtn}>
              Save account details
            </button>
            <StatusMessage status={accountStatus} />
          </form>
        </div>

        <div>
          <button style={styles.grayBtn} onClick={() => setCurrentView("home")}>
            <span aria-hidden="true">←</span> Return to home
          </button>
        </div>
      </div>
    </div>
  );
}
