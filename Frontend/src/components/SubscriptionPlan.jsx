import React from "react";
import PropTypes from "prop-types";
import "./SubscriptionPlan.css";
import subscribe from "../utils/subscription";

function SubscriptionPlan({ plan }) {
  // Add error handling for missing plan prop
  if (!plan) {
    return (
      <div className="subscription-plan error">
        <p className="error-text">Error: Plan details are missing</p>
      </div>
    );
  }

  const {
    title,
    description,
    price,
    period,
    features,
    isPopular,
    buttonText,
    buttonStyle,
  } = plan;

  const handleSubmit = async(e) => {
    e.preventDefault();
    subscribe(title, price);
  }

  return (
    <div className={`subscription-plan ${isPopular ? "popular" : ""}`}>
      {isPopular && <div className="popular-badge">Popular</div>}

      <div className="plan-header">
        <h3 className="plan-title">{title}</h3>
        <p className="plan-description">{description}</p>
        <div className="plan-price">{price}</div>
        <p className="plan-period">{period}</p>
      </div>

      <ul className="features-list">
        {features.map((feature, index) => (
          <li key={index} className="feature-item">
            <i className="fas fa-check feature-check"></i>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button onClick={handleSubmit}
        className={`plan-button ${
          buttonStyle === "filled" ? "filled" : "outlined"
        }`}
      >
        {buttonText}
      </button>
    </div>
  );
}

// Add PropTypes validation
SubscriptionPlan.propTypes = {
  plan: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    period: PropTypes.string.isRequired,
    features: PropTypes.arrayOf(PropTypes.string).isRequired,
    isPopular: PropTypes.bool,
    buttonText: PropTypes.string.isRequired,
    buttonStyle: PropTypes.oneOf(["filled", "outlined"]),
  }).isRequired,
};

// Add default props
SubscriptionPlan.defaultProps = {
  plan: {
    isPopular: false,
    buttonStyle: "filled",
  },
};

export default SubscriptionPlan;
