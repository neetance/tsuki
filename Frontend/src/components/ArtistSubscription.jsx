import React from "react";
import SubscriptionPlan from "./SubscriptionPlan";
import "./ArtistSubscription.css";

function ArtistSubscription() {
  const plans = [
    {
      id: 1,
      title: "Basic Plan",
      description: "For beginners",
      price: "0.05 ETH",
      period: "per month",
      features: [
        "2 Submissions per week",
        "Validator Status",
        "5% Royalty on Sales",
        "Community Discord Access",
      ],
      isPopular: false,
      buttonText: "Subscribe Now",
      buttonStyle: "border",
    },
    {
      id: 2,
      title: "Premium Plan",
      description: "For serious artists",
      price: "0.1 ETH",
      period: "per month",
      features: [
        "5 Submissions per week",
        "Validator Status",
        "8% Royalty on Sales",
        "Community Discord Access",
        "Artist Spotlight Feature",
      ],
      isPopular: true,
      buttonText: "Subscribe Now",
      buttonStyle: "filled",
    },
    {
      id: 3,
      title: "Pro Plan",
      description: "For professional artists",
      price: "0.2 ETH",
      period: "per month",
      features: [
        "Unlimited Submissions",
        "Validator Status",
        "12% Royalty on Sales",
        "Community Discord Access",
        "Artist Spotlight Feature",
        "Custom Artist Page",
      ],
      isPopular: false,
      buttonText: "Subscribe Now",
      buttonStyle: "border",
    },
  ];

  return (
    <section className="py-16 px-6 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Become an Artist & Validator
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Subscribe to submit your artwork and participate in the validation
            process. Earn royalties and shape the future of AnimeRealm.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <SubscriptionPlan key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ArtistSubscription;
