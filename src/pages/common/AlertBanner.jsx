const AlertBanner = ({ message, variant }) => {
  const errorMessage =
    message || "An unexpected error occured. Please try again later";
  const alertVariant = variant || "danger";

  return (
    <div
      role="alert"
      testid="alert"
      style={{ backgroundColor: "red", color: "white", padding: "1rem" }}
    >
      {errorMessage}
    </div>
  );
};

export default AlertBanner;
