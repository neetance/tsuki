import React from "react";
import "./ArtistDashboard.css";

function ArtistDashboard() {
  const features = [
    {
      id: 1,
      icon: "fas fa-palette",
      title: "Content Submission",
      description:
        "Upload your Anime x Reality artwork and track its validation status.",
    },
    {
      id: 2,
      icon: "fas fa-vote-yea",
      title: "Validator Portal",
      description:
        "Review and vote on other artists' submissions, ensuring quality content.",
    },
    {
      id: 3,
      icon: "fas fa-chart-line",
      title: "Analytics & Royalties",
      description: "Track your earnings, sales, and validation reputation.",
    },
  ];

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-gray-900 to-black-900">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Artist & Validator Dashboard
            </h2>
            <p className="text-xl text-gray-300 mb-6">
              Track your submissions, manage your validator responsibilities,
              and monitor your earnings in one place.
            </p>
            <ul className="space-y-4 mb-8">
              {features.map((feature) => (
                <li key={feature.id} className="flex items-start">
                  <div className="bg-purplblue-400 p-2 rounded-lg mr-4 mt-1">
                    <i className={`${feature.icon} text-white`}></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </li>
              ))}
            </ul>
            <button className="bg-blue-400 hover:bg-blue-400 text-white px-6 py-3 rounded-lg font-bold flex items-center">
              Explore Dashboard <i className="fas fa-arrow-right ml-2"></i>
            </button>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl shadow-lg">
            <img
              src="/soc1.png"
              alt="Artist Dashboard"
              className="w-full rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ArtistDashboard;
