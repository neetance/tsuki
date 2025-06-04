import React, { useState } from "react";

const Layout = ({ children }) => (
  <div className="min-h-screen bg-black text-white">{children}</div>
);

const Explore = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [filterRarity, setFilterRarity] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const nfts = [
    {
      id: 1,
      title: "Cyberpunk Girl in Tokyo",
      price: "0.15 ETH",
      image: "/cardn1.jpeg",
      artist: "@neo_tokyo_artist",
      votes: 24,
      rarity: "rare",
      date: "2025-05-10",
    },
    {
      id: 2,
      title: "Samurai in Modern Shibuya",
      price: "0.25 ETH",
      image: "/cardn2.jpeg",
      artist: "@samurai_blend",
      votes: 42,
      rarity: "epic",
      date: "2025-05-12",
    },
    {
      id: 3,
      title: "Mecha in New York",
      price: "0.45 ETH",
      image: "/cardn3.jpeg",
      artist: "@mecha_master",
      votes: 53,
      rarity: "legendary",
      date: "2025-05-15",
    },
    {
      id: 4,
      title: "Anime School in Reality",
      price: "0.18 ETH",
      image: "/cardn4.jpeg",
      artist: "@school_life",
      votes: 31,
      rarity: "common",
      date: "2025-05-11",
    },
    {
      id: 5,
      title: "Magical Girl in London",
      price: "0.22 ETH",
      image: "/cardn5.jpeg",
      artist: "@magic_creator",
      votes: 46,
      rarity: "rare",
      date: "2025-05-09",
    },
    {
      id: 6,
      title: "Demon Hunter in Paris",
      price: "0.35 ETH",
      image: "/cardn6.jpeg",
      artist: "@demon_art",
      votes: 58,
      rarity: "epic",
      date: "2025-05-07",
    },
  ];

  const filterNFTs = () => {
    let filtered = [...nfts];

    // Filter by category
    if (activeTab !== "all") {
      // In a real app, you would have a category field
      // This is just for demonstration
    }

    // Filter by rarity
    if (filterRarity !== "all") {
      filtered = filtered.filter((nft) => nft.rarity === filterRarity);
    }

    // Sort
    if (sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === "oldest") {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (sortBy === "price-low") {
      filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortBy === "popularity") {
      filtered.sort((a, b) => b.votes - a.votes);
    }

    return filtered;
  };

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case "common":
        return "bg-gray-500";
      case "rare":
        return "bg-sky-600";
      case "epic":
        return "bg-blue-700";
      case "legendary":
        return "bg-blue-400";
      default:
        return "bg-gray-500";
    }
  };

  const getRarityText = (rarity) => {
    return rarity.charAt(0).toUpperCase() + rarity.slice(1);
  };

  const filteredNFTs = filterNFTs();

  return (
    <Layout>
      {/* Hero Section with Background Image */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/soc20.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        {/* Dark overlay */}
        {/* <div className="absolute inset-0 bg-black/60"></div> */}
        {/* Content overlay */}
        <div className="relative z-10 h-full container mx-auto px-6">
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-white">
                Explore NFTs
              </h1>
              <p className="text-white text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
                Discover unique anime-inspired NFTs from talented artists around
                the world. Find rare collectibles, stunning artwork, and
                exclusive digital creations in our curated marketplace.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 overflow-x-auto">
            <button
              className={`px-6 py-3 font-medium whitespace-nowrap transition-all duration-300 rounded-lg ${
                activeTab === "all"
                  ? "bg-blue-400 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
              onClick={() => setActiveTab("all")}
            >
              All NFTs
            </button>
            <button
              className={`px-6 py-3 font-medium whitespace-nowrap transition-all duration-300 rounded-lg ${
                activeTab === "artwork"
                  ? "bg-blue-400 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
              onClick={() => setActiveTab("artwork")}
            >
              Artwork
            </button>
            <button
              className={`px-6 py-3 font-medium whitespace-nowrap transition-all duration-300 rounded-lg ${
                activeTab === "collectibles"
                  ? "bg-blue-400 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
              onClick={() => setActiveTab("collectibles")}
            >
              Collectibles
            </button>
            <button
              className={`px-6 py-3 font-medium whitespace-nowrap transition-all duration-300 rounded-lg ${
                activeTab === "animation"
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
              onClick={() => setActiveTab("animation")}
            >
              Animation
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <label className="text-gray-300 font-medium">Rarity:</label>
            <select
              value={filterRarity}
              onChange={(e) => setFilterRarity(e.target.value)}
              className="bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-lg focus:border-blue-400 focus:outline-none"
            >
              <option value="all">All Rarities</option>
              <option value="common">Common</option>
              <option value="rare">Rare</option>
              <option value="epic">Epic</option>
              <option value="legendary">Legendary</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-gray-300 font-medium">Sort By:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-lg focus:border-blue-400 focus:outline-none"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="price-high">Price: High to Low</option>
              <option value="price-low">Price: Low to High</option>
              <option value="popularity">Popularity</option>
            </select>
          </div>

          <div className="flex ml-auto">
            <input
              type="text"
              placeholder="Search NFTs..."
              className="px-4 py-2 bg-gray-800 border border-gray-700 border-r-0 rounded-l-lg focus:border-blue-400 focus:outline-none text-white"
            />
            <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-r-lg transition-all duration-300">
              🔍
            </button>
          </div>
        </div>

        {/* NFT Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNFTs.map((nft) => (
            <div
              key={nft.id}
              className="bg-gray-800 rounded-xl overflow-hidden transition-all duration-300 hover:bg-gray-700 hover:scale-105 cursor-pointer"
            >
              <div className="relative">
                <img
                  src={nft.image}
                  alt={nft.title}
                  className="w-full h-64 object-cover"
                />
                <div
                  className={`absolute bottom-2 left-2 ${getRarityColor(
                    nft.rarity
                  )} text-white text-xs px-2 py-1 rounded-lg`}
                >
                  {getRarityText(nft.rarity)}
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-lg">{nft.title}</h3>
                  <span className="text-blue-400">{nft.price}</span>
                </div>
                <div className="flex items-center text-sm text-gray-400 mb-4">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-xs font-bold mr-2">
                    {nft.artist[1].toUpperCase()}
                  </div>
                  <span>{nft.artist}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm">
                    <span className="text-green-400 mr-1">👍</span>
                    <span>{nft.votes} Votes</span>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-3 py-1 rounded-lg transition-all duration-300">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <div className="flex gap-2">
            <button className="px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors">
              ❮
            </button>
            <button className="px-3 py-2 bg-blue-600 text-white rounded">
              1
            </button>
            <button className="px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors">
              2
            </button>
            <button className="px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors">
              3
            </button>
            <span className="px-3 py-2 text-gray-400">...</span>
            <button className="px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors">
              10
            </button>
            <button className="px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors">
              ❯
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Explore;
