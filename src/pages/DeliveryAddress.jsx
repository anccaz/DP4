
import { useState } from "react";
import { styles } from "../styles/styles";

const EMPTY_ADDRESS = {
  fullName: "",
  street: "",
  apartment: "",
  city: "",
  state: "",
  zip: "",
};

export default function DeliveryAddress({
  selectedProduct,
  initialAddress,
  onContinue,
  setCurrentView,
}) {
  const [address, setAddress] = useState({
    ...EMPTY_ADDRESS,
    ...initialAddress,
  });

  const [attemptedSubmit, setAttemptedSubmit] =
    useState(false);

  const updateField = (field, value) => {
    setAddress((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const fields = [
    {
      id: "fullName",
      label: "Full Name",
      placeholder: "Recipient's full name",
      required: true,
    },
    {
      id: "street",
      label: "Street Address",
      placeholder: "Street number and name",
      required: true,
    },
    {
      id: "apartment",
      label: "Apartment, Suite, or Unit",
      placeholder: "Optional",
      required: false,
    },
    {
      id: "city",
      label: "City",
      placeholder: "City",
      required: true,
    },
    {
      id: "state",
      label: "State",
      placeholder: "State or two-letter abbreviation",
      required: true,
    },
    {
      id: "zip",
      label: "ZIP Code",
      placeholder: "12345",
      required: true,
    },
  ];

  const hasRequiredFields = [
    "fullName",
    "street",
    "city",
    "state",
  ].every((field) => address[field].trim() !== "");

  const validZip = /^\d{5}(-\d{4})?$/.test(
    address.zip.trim()
  );

  const isValid = hasRequiredFields && validZip;

  const handleSubmit = (event) => {
    event.preventDefault();
    setAttemptedSubmit(true);

    if (!isValid) return;

    onContinue({
      fullName: address.fullName.trim(),
      street: address.street.trim(),
      apartment: address.apartment.trim(),
      city: address.city.trim(),
      state: address.state.trim(),
      zip: address.zip.trim(),
    });
  };

  const formatPrice = (price) => `$${price.toFixed(2)}`;

  return (
    <div>
      <span style={styles.subLabel}>Online Delivery</span>

      <h1 style={styles.pageHeading}>
        Delivery Information
      </h1>

      <p
        style={{
          fontSize: "17px",
          color: "#475569",
          lineHeight: "1.6",
          marginBottom: "24px",
        }}
      >
        Enter the address where you would like
        your order delivered.
      </p>

      <div
        style={{
          ...styles.card,
          maxWidth: "720px",
          marginBottom: "24px",
        }}
      >
        <h2 style={{ marginTop: 0 }}>
          {selectedProduct.name}
        </h2>

        <p style={{ color: "#64748b" }}>
          Sold by {selectedProduct.store}
        </p>

        <strong style={{ fontSize: "24px" }}>
          {formatPrice(selectedProduct.price)}
        </strong>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        style={{
          ...styles.card,
          maxWidth: "720px",
        }}
      >
        <h2
          style={{
            fontSize: "22px",
            marginTop: 0,
          }}
        >
          Shipping Address
        </h2>

        <p
          style={{
            color: "#64748b",
            fontSize: "14px",
          }}
        >
          Fields marked with * are required.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "18px",
          }}
        >
          {fields.map((field) => {
            const invalid =
              attemptedSubmit &&
              (field.id === "zip"
                ? !validZip
                : field.required &&
                  !address[field.id].trim());

            return (
              <label
                key={field.id}
                htmlFor={`delivery-${field.id}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  fontSize: "15px",
                  fontWeight: "600",
                }}
              >
                <span>
                  {field.label}
                  {field.required ? " *" : ""}
                </span>

                <input
                  id={`delivery-${field.id}`}
                  type="text"
                  value={address[field.id]}
                  placeholder={field.placeholder}
                  autoComplete={
                    {
                      fullName: "name",
                      street: "address-line1",
                      apartment: "address-line2",
                      city: "address-level2",
                      state: "address-level1",
                      zip: "postal-code",
                    }[field.id]
                  }
                  aria-invalid={invalid}
                  aria-describedby={
                    invalid
                      ? `error-${field.id}`
                      : undefined
                  }
                  onChange={(event) =>
                    updateField(
                      field.id,
                      event.target.value
                    )
                  }
                  style={{
                    padding: "13px 14px",
                    border: invalid
                      ? "2px solid #dc2626"
                      : "1px solid #cbd5e1",
                    borderRadius: "8px",
                    fontSize: "16px",
                    backgroundColor: "#fff",
                    boxSizing: "border-box",
                    width: "100%",
                  }}
                />

                {invalid && (
                  <span
                    id={`error-${field.id}`}
                    role="alert"
                    style={{
                      color: "#b91c1c",
                      fontSize: "13px",
                    }}
                  >
                    {field.id === "zip"
                      ? "Enter a valid US ZIP code."
                      : "This field is required."}
                  </span>
                )}
              </label>
            );
          })}
        </div>

        {attemptedSubmit && !isValid && (
          <p
            role="alert"
            style={{
              marginTop: "18px",
              color: "#b91c1c",
              fontWeight: "600",
            }}
          >
            Please complete the required address
            information before continuing.
          </p>
        )}

        <div
          style={{
            borderTop: "1px solid #e2e8f0",
            paddingTop: "20px",
            marginTop: "24px",
          }}
        >
          <p
            style={{
              fontSize: "14px",
              color: "#64748b",
              marginBottom: "20px",
            }}
          >
            You can review this address before
            confirming your order.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <button
              type="submit"
              style={styles.yellowBtn}
            >
              Review Order
            </button>

            <button
              type="button"
              style={styles.outlineBtn}
              onClick={() =>
                setCurrentView("buyingOptions")
              }
            >
              ← Back to Buying Options
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
