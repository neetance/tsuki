import React from "react";
import "./ValidatorGovernance.css";

function ValidatorGovernance() {
  const governanceFeatures = [
    {
      id: 1,
      title: "Community Voting",
      description:
        "All validators participate in the approval process to maintain quality standards.",
      icon: "fas fa-vote-yea",
    },
    {
      id: 2,
      title: "Transparency",
      description:
        "All voting results and validator activities are recorded on-chain for full transparency.",
      icon: "fas fa-eye",
    },
    {
      id: 3,
      title: "Reward System",
      description:
        "Active validators earn tokens for participating in the curation process.",
      icon: "fas fa-award",
    },
    {
      id: 4,
      title: "Dispute Resolution",
      description:
        "Fair system to handle disagreements about artwork validation.",
      icon: "fas fa-balance-scale",
    },
  ];

  return (
    <section className="py-16 px-6 bg-gray-900" id="dao">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Validator Governance</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Our community-driven validation system ensures high-quality artwork
            while maintaining fairness and transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {governanceFeatures.map((feature) => (
            <div
              key={feature.id}
              className="bg-gray-800 hover:bg-gray-700 p-6 rounded-xl transition-all duration-300"
            >
              <div className="flex items-start">
                <div className="bg-blue-400 p-3 rounded-lg mr-4">
                  <i className={`${feature.icon} text-white text-xl`}></i>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.description}</p>
                  {/* Dummy content */}
                  <p className="text-gray-500 text-sm mt-2">
                    More details coming soon...
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ValidatorGovernance;
