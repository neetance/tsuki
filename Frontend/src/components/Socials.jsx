import React, { useState } from "react";

const Layout = ({ children }) => (
  <div className="min-h-screen bg-black text-white">{children}</div>
);

const Socials = () => {
  const [activeTab, setActiveTab] = useState("discussions");

  const communityStats = [
    { icon: "👥", value: "15,420+", label: "Community Members" },
    { icon: "💬", value: "8,750+", label: "Active Discussions" },
    { icon: "📅", value: "24", label: "Upcoming Events" },
  ];

  const categories = [
    { name: "General Discussion", count: 142, icon: "💬" },
    { name: "Trading & Marketplace", count: 98, icon: "💰" },
    { name: "Art & Creation", count: 76, icon: "🎨" },
    { name: "Technical Support", count: 53, icon: "🔧" },
  ];

  const discussions = [
    {
      title: "What do you think about the future of anime NFTs?",
      author: "NeoTokyoFan",
      timeAgo: "2 hours ago",
      replies: 24,
      views: 342,
      badge: "Hot",
    },
    {
      title: "Introducing myself to the AnimeNFT community!",
      author: "AnimeArtsPro",
      timeAgo: "5 hours ago",
      replies: 18,
      views: 276,
      badge: "New",
    },
    {
      title: "Official AnimeNFT roadmap discussion thread",
      author: "AnimeNFT_Mod",
      timeAgo: "1 day ago",
      replies: 56,
      views: 1245,
      badge: "Official",
    },
    {
      title: "Weekly community spotlight: Share your collections!",
      author: "MechaCollector",
      timeAgo: "3 days ago",
      replies: 32,
      views: 587,
      badge: null,
    },
  ];

  const tabButtons = [
    { id: "discussions", label: "Discussions", icon: "💬" },
    { id: "discord", label: "Discord", icon: "🎮" },
    { id: "events", label: "Events", icon: "📅" },
    { id: "showcase", label: "Showcase", icon: "🖼️" },
    { id: "leaderboard", label: "Leaderboard", icon: "🏆" },
    { id: "social", label: "Social Feed", icon: "#️⃣" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* Background Image - Replace '/city.jpg' with your image path */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/soc3.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            // backgroundAttachment: "",
          }}
        ></div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content overlay */}
        <div className="relative z-10 h-full container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Join Our Vibrant Community
              </h2>
              <p className="text-white-300 text-lg mb-8 leading-relaxed">
                Connect with fellow anime NFT enthusiasts, participate in
                discussions, attend exclusive events, and showcase your
                collection in our thriving community hub.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                {communityStats.map((stat, index) => (
                  <div
                    key={index}
                    className="text-center backdrop-blur-sm bg-white/10 p-4 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <div className="text-2xl font-bold text-cyan-400">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-300">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm">
                  🎮 Join Discord
                </button>
                <button className="border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black px-6 py-3 rounded-lg font-semibold transition-all duration-300 backdrop-blur-sm">
                  📅 View Events
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-800 sticky top-0 bg-black/90 backdrop-blur-md z-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
            {tabButtons.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-medium whitespace-nowrap transition-all duration-300 border-b-2 ${
                  activeTab === tab.id
                    ? "border-cyan-400 text-cyan-400 bg-cyan-400/10"
                    : "border-transparent text-gray-400 hover:text-white hover:bg-gray-800/50"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {activeTab === "discussions" && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-bold mb-6 text-cyan-400">
                  Categories
                </h3>
                <div className="space-y-3">
                  {categories.map((category, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{category.icon}</span>
                        <span className="text-sm font-medium">
                          {category.name}
                        </span>
                      </div>
                      <span className="text-xs bg-gray-700 px-2 py-1 rounded-full text-gray-300">
                        {category.count}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-gradient-to-br from-purple-900/30 to-cyan-900/30 rounded-lg border border-purple-400/30">
                  <h4 className="font-bold mb-2 text-purple-400">
                    Community Stats
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Threads:</span>
                      <span className="text-white font-medium">8,750</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Active Users:</span>
                      <span className="text-white font-medium">1,245</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">New Today:</span>
                      <span className="text-white font-medium">124</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Discussion Area */}
            <div className="lg:col-span-3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold">General Discussion</h2>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <input
                    type="text"
                    placeholder="Search discussions..."
                    className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:border-cyan-400 focus:outline-none min-w-0 sm:min-w-64"
                  />
                  <button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 px-4 py-2 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap">
                    + New Thread
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {discussions.map((discussion, index) => (
                  <div
                    key={index}
                    className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-gray-700 hover:bg-gray-900/70 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {discussion.author[0].toUpperCase()}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-3 mb-2 flex-wrap">
                          <h3 className="text-lg font-semibold hover:text-cyan-400 transition-colors flex-1 min-w-0">
                            {discussion.title}
                          </h3>
                          {discussion.badge && (
                            <span
                              className={`px-2 py-1 text-xs rounded-full font-medium flex-shrink-0 ${
                                discussion.badge === "Hot"
                                  ? "bg-red-600 text-white"
                                  : discussion.badge === "New"
                                  ? "bg-green-600 text-white"
                                  : discussion.badge === "Official"
                                  ? "bg-purple-600 text-white"
                                  : ""
                              }`}
                            >
                              {discussion.badge}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-400 mb-3 flex-wrap">
                          <span className="flex items-center gap-1">
                            <span>👤</span>
                            <span>{discussion.author}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <span>⏰</span>
                            <span>{discussion.timeAgo}</span>
                          </span>
                        </div>

                        <div className="flex items-center gap-6 text-sm text-gray-400 flex-wrap">
                          <span className="flex items-center gap-1">
                            <span>💬</span>
                            <span>{discussion.replies} replies</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <span>👁️</span>
                            <span>{discussion.views} views</span>
                          </span>
                        </div>
                      </div>

                      <button className="text-gray-400 hover:text-white transition-colors flex-shrink-0">
                        ↗️
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="relative">
                {" "}
                {/* Make this container relative */}
                <div className="flex justify-center mt-8">
                  <div className="flex gap-2 flex-wrap justify-center">
                    <button className="px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors">
                      ❮
                    </button>
                    <button className="px-3 py-2 bg-cyan-600 text-white rounded">
                      1
                    </button>
                    <button className="px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors">
                      2
                    </button>
                    <button className="px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors">
                      3
                    </button>
                    <button className="px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors">
                      4
                    </button>
                    <button className="px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors">
                      5
                    </button>
                    <button className="px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors">
                      ❯
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab !== "discussions" && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🚧</div>
            <h3 className="text-2xl font-bold mb-2">Coming Soon</h3>
            <p className="text-gray-400">
              This section is under development. Check back soon!
            </p>
          </div>
        )}
      </div>

      {/* Newsletter Section */}
      <div className="max-w-6xl mx-auto px-6 pb-12">
        <div className="bg-gradient-to-r from-gray-900 to-black-900 rounded-xl p-8 border border-purple-400/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
              <p className="text-gray-300 mb-6">
                Subscribe to our newsletter for the latest drops, events, and
                marketplace insights. We'll also send you a free NFT as a
                welcome gift!
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-3 bg-gray-800 text-white rounded-lg flex-grow focus:outline-none focus:ring-2 focus:ring-cyan-400 border border-gray-700"
                />
                <button className="bg-gradient-to-r from-red-600 to-red-600 hover:from-red-500 hover:to-purple-500 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300">
                  Subscribe
                </button>
              </div>
            </div>
            <div className="hidden md:flex justify-end">
              <div className="w-48 h-48 bg-gradient-to-br from-purple-600/30 to-cyan-600/30 rounded-lg border border-cyan-400/30 flex items-center justify-center">
                <span className="text-4xl">🎁</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Socials;
