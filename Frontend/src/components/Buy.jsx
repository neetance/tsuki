import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import "./Buy.css";

const Buy = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 2]);
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);

  // Show coming soon modal when component mounts
  useEffect(() => {
    setShowComingSoonModal(true);
  }, []);

  // NFT Collections data
  const nftCollections = [
    {
      id: 1,
      name: "Cyberpunk Fusion",
      description: "Futuristic anime characters in cyberpunk environments",
      itemCount: 120,
      floorPrice: 0.15,
      verified: true,
      image: "/ava1.jpeg",
      banner: "/goku.jpg",
    },
    {
      id: 2,
      name: "Samurai Legacy",
      description: "Traditional samurai meets modern cityscape",
      itemCount: 85,
      floorPrice: 0.25,
      verified: true,
      image: "/ava2.jpeg",
      banner: "/soc2.png",
    },
    {
      id: 3,
      name: "Mecha Universe",
      description: "Giant mecha anime crossovers with reality",
      itemCount: 65,
      floorPrice: 0.35,
      verified: true,
      image: "/ava3.jpeg",
      banner: "/soc4.jpg",
    },
    {
      id: 4,
      name: "Fantasy Realms",
      description: "Anime fantasy characters in real-world settings",
      itemCount: 110,
      floorPrice: 0.18,
      verified: false,
      image: "/ava4.jpeg",
      banner: "/soc5.jpg",
    },
  ];

  // NFT items data
  const nftItems = [
    {
      id: 1,
      name: "Neo Tokyo Wanderer",
      price: 0.15,
      creator: "@neo_tokyo_artist",
      likes: 24,
      category: "cyberpunk",
      rarity: "rare",
      image: "/goku.jpg",
    },
    {
      id: 2,
      name: "Shibuya Samurai",
      price: 0.25,
      creator: "@samurai_blend",
      likes: 42,
      category: "samurai",
      rarity: "epic",
      image: "/cardn1.jpeg",
    },
    {
      id: 3,
      name: "Manhattan Mecha",
      price: 0.45,
      creator: "@mecha_master",
      likes: 53,
      category: "mecha",
      rarity: "legendary",
      image: "/cardn2.jpeg",
    },
    {
      id: 4,
      name: "Digital Kitsune",
      price: 0.12,
      creator: "@anime_fusion",
      likes: 19,
      category: "fantasy",
      rarity: "common",
      image: "/cardn3.jpeg",
    },
    {
      id: 5,
      name: "Cyber Geisha",
      price: 0.22,
      creator: "@neo_tokyo_artist",
      likes: 38,
      category: "cyberpunk",
      rarity: "rare",
      image: "/cardn4.jpeg",
    },
    {
      id: 6,
      name: "Ronin's Revenge",
      price: 0.35,
      creator: "@samurai_blend",
      likes: 47,
      category: "samurai",
      rarity: "epic",
      image: "/cardn5.jpeg",
    },
  ];

  // Filter NFTs based on active filter, price range, and search query
  const filteredNFTs = nftItems.filter((nft) => {
    const matchesCategory =
      activeFilter === "all" || nft.category === activeFilter;
    const matchesPrice =
      nft.price >= priceRange[0] && nft.price <= priceRange[1];
    const matchesSearch =
      nft.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nft.creator.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesPrice && matchesSearch;
  });

  // Sort NFTs based on sortBy option
  const sortedNFTs = [...filteredNFTs].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "popularity":
        return b.likes - a.likes;
      case "newest":
      default:
        return b.id - a.id;
    }
  });

  const handlePriceChange = (e) => {
    const value = parseFloat(e.target.value);
    if (e.target.id === "min-price") {
      setPriceRange([value, priceRange[1]]);
    } else {
      setPriceRange([priceRange[0], value]);
    }
  };

  const closeModal = () => {
    setShowComingSoonModal(false);
  };

  return (
    <Layout>
      {/* Coming Soon Modal */}
      {showComingSoonModal && (
        <div className="coming-soon-modal-overlay" onClick={closeModal}>
          <div
            className="coming-soon-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="coming-soon-close" onClick={closeModal}>
              <i className="fas fa-times"></i>
            </button>
            <div className="coming-soon-content">
              <div className="coming-soon-icon">
                <i className="fas fa-rocket"></i>
              </div>
              <h2 className="coming-soon-title">Coming Soon!</h2>
              <p className="coming-soon-description">
                Our NFT marketplace is launching soon. Get ready to discover
                amazing anime x reality digital collectibles from talented
                artists around the world.
              </p>
              <div className="coming-soon-features">
                <div className="coming-soon-feature">
                  <i className="fas fa-palette"></i>
                  <span>Unique Anime Collections</span>
                </div>
                <div className="coming-soon-feature">
                  <i className="fas fa-shield-alt"></i>
                  <span>Verified Artists</span>
                </div>
                <div className="coming-soon-feature">
                  <i className="fas fa-star"></i>
                  <span>Exclusive Drops</span>
                </div>
              </div>
              <div className="coming-soon-buttons">
                <button className="btn-primary" onClick={closeModal}>
                  <i className="fas fa-bell"></i>
                  Notify Me When Live
                </button>
                <button className="btn-secondary" onClick={closeModal}>
                  Continue Browsing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="buy-hero-section">
        <div className="buy-hero-bg"></div>
        <div className="buy-hero-overlay"></div>
        <div className="buy-hero-content">
          <div className="buy-hero-grid">
            <div>
              <h1 className="buy-hero-title">Buy Anime x Reality NFTs</h1>
              <p className="buy-hero-description">
                Discover unique digital collectibles that blend anime aesthetics
                with real-world photography. Own exclusive pieces from verified
                artists and join our growing community.
              </p>

              <div className="buy-button-container">
                <button className="btn-primary">
                  <i className="fas fa-wallet"></i>
                  Connect Wallet
                </button>
                <button className="btn-secondary">Browse Collections</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="buy-main-container">
        {/* Featured Collections */}
        <section className="buy-section">
          <h2 className="buy-section-title">Featured Collections</h2>
          <div className="buy-collections-grid">
            {nftCollections.map((collection) => (
              <div key={collection.id} className="buy-collection-card">
                <div className="buy-collection-banner-container">
                  <img
                    src={collection.banner}
                    alt={collection.name}
                    className="buy-collection-banner"
                  />
                  <div className="buy-collection-image-container">
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="buy-collection-image"
                    />
                  </div>
                  {collection.verified && (
                    <div className="buy-collection-verified">
                      <i className="fas fa-check-circle"></i> Verified
                    </div>
                  )}
                </div>
                <div className="buy-collection-content">
                  <h3 className="buy-collection-name">{collection.name}</h3>
                  <p className="buy-collection-description">
                    {collection.description}
                  </p>
                  <div className="buy-collection-stats">
                    <div className="buy-collection-stat">
                      <span className="buy-stat-accent">
                        {collection.itemCount}
                      </span>{" "}
                      items
                    </div>
                    <div className="buy-collection-stat">
                      Floor:{" "}
                      <span className="buy-stat-accent">
                        {collection.floorPrice} ETH
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Marketplace */}
        <section className="buy-section">
          <h2 className="buy-section-title">NFT Marketplace</h2>

          {/* Filters */}
          <div className="buy-filters-container">
            <div className="buy-filters-grid">
              {/* Search */}
              <div className="buy-filter-group">
                <h3 className="buy-filter-title">Search</h3>
                <div className="buy-search-container">
                  <input
                    type="text"
                    placeholder="Search by name or creator"
                    className="buy-search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <i className="fas fa-search buy-search-icon"></i>
                </div>
              </div>

              {/* Price Range */}
              <div className="buy-filter-group">
                <h3 className="buy-filter-title">Price Range (ETH)</h3>
                <div className="buy-price-inputs">
                  <div className="buy-price-input-group">
                    <label className="buy-price-label">Min</label>
                    <input
                      id="min-price"
                      type="number"
                      min="0"
                      step="0.01"
                      className="buy-price-input"
                      value={priceRange[0]}
                      onChange={handlePriceChange}
                    />
                  </div>
                  <div className="buy-price-input-group">
                    <label className="buy-price-label">Max</label>
                    <input
                      id="max-price"
                      type="number"
                      min="0"
                      step="0.01"
                      className="buy-price-input"
                      value={priceRange[1]}
                      onChange={handlePriceChange}
                    />
                  </div>
                </div>
              </div>

              {/* Sort By */}
              <div className="buy-filter-group">
                <h3 className="buy-filter-title">Sort By</h3>
                <select
                  className="buy-sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="popularity">Popularity</option>
                </select>
              </div>
            </div>

            {/* Category Filters */}
            <div className="buy-category-filters">
              <h3 className="buy-filter-title">Categories</h3>
              <div className="buy-category-buttons">
                {["all", "cyberpunk", "samurai", "mecha", "fantasy"].map(
                  (category) => (
                    <button
                      key={category}
                      className={`buy-category-btn ${
                        activeFilter === category ? "active" : ""
                      }`}
                      onClick={() => setActiveFilter(category)}
                    >
                      {category === "all"
                        ? "All"
                        : category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>

          {/* NFT Grid */}
          <div className="buy-nft-grid">
            {sortedNFTs.length > 0 ? (
              sortedNFTs.map((nft) => (
                <div key={nft.id} className="buy-nft-card">
                  <div className="buy-nft-image-container">
                    <img
                      src={nft.image}
                      alt={nft.name}
                      className="buy-nft-image"
                    />
                    <div
                      className={`buy-rarity-badge buy-rarity-${nft.rarity}`}
                    >
                      {nft.rarity.charAt(0).toUpperCase() + nft.rarity.slice(1)}
                    </div>
                  </div>
                  <div className="buy-nft-content">
                    <div className="buy-nft-header">
                      <h3 className="buy-nft-name">{nft.name}</h3>
                      <span className="buy-nft-price">{nft.price} ETH</span>
                    </div>
                    <div className="buy-nft-creator">
                      <img
                        src="/api/placeholder/24/24"
                        alt="Artist avatar"
                        className="buy-creator-avatar"
                      />
                      <span>{nft.creator}</span>
                    </div>
                    <div className="buy-nft-footer">
                      <div className="buy-nft-likes">
                        <i className="fas fa-thumbs-up"></i>
                        <span>{nft.likes} Likes</span>
                      </div>
                      <button className="buy-now-btn">Buy Now</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="buy-no-results">
                <i className="fas fa-search buy-no-results-icon"></i>
                <h3 className="buy-no-results-title">No NFTs found</h3>
                <p className="buy-no-results-text">
                  Try adjusting your filters or search query
                </p>
              </div>
            )}
          </div>

          {/* Load More Button */}
          {sortedNFTs.length > 0 && (
            <div className="buy-load-more-container">
              <button className="buy-load-more-btn">Load More NFTs</button>
            </div>
          )}
        </section>

        {/* How to Buy Guide */}
        <section className="buy-section">
          <h2 className="buy-section-title">How to Buy</h2>
          <div className="buy-guide-container">
            <div className="buy-guide-grid">
              <div className="buy-guide-step">
                <div className="buy-guide-icon">
                  <i className="fas fa-wallet"></i>
                </div>
                <h3 className="buy-guide-step-title">1. Connect Wallet</h3>
                <p className="buy-guide-step-text">
                  Connect your Ethereum wallet to start buying and collecting
                  anime NFTs.
                </p>
              </div>

              <div className="buy-guide-step">
                <div className="buy-guide-icon">
                  <i className="fas fa-search"></i>
                </div>
                <h3 className="buy-guide-step-title">2. Browse & Select</h3>
                <p className="buy-guide-step-text">
                  Explore our collections and find the perfect anime NFT that
                  matches your style.
                </p>
              </div>

              <div className="buy-guide-step">
                <div className="buy-guide-icon">
                  <i className="fas fa-shopping-cart"></i>
                </div>
                <h3 className="buy-guide-step-title">3. Purchase NFT</h3>
                <p className="buy-guide-step-text">
                  Buy instantly at listed price or make an offer and wait for
                  the seller to accept.
                </p>
              </div>
            </div>

            <div className="buy-guide-info">
              <div className="buy-guide-info-icon">
                <i className="fas fa-info"></i>
              </div>
              <div>
                <h4 className="buy-guide-info-title">New to NFTs?</h4>
                <p className="buy-guide-info-text">
                  Check out our{" "}
                  <a href="#" className="buy-guide-link">
                    beginner's guide
                  </a>{" "}
                  to get started with wallets, ETH, and buying your first anime
                  NFT.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Drops */}
        <section className="buy-section">
          <h2 className="buy-section-title">Upcoming Drops</h2>
          <div className="buy-drops-container">
            <div className="buy-drops-grid">
              <div className="buy-drop-info">
                <div className="buy-drop-header">
                  <div className="buy-countdown-badge">In 3 days</div>
                  <h3 className="buy-drop-title">Neon Ronin Collection</h3>
                </div>

                <p className="buy-drop-description">
                  A limited edition collection of 100 unique Neon Ronin NFTs,
                  fusing traditional samurai aesthetics with cyberpunk neon
                  elements. Created by renowned artist @cyber_samurai.
                </p>

                <div className="buy-drop-stats-grid">
                  <div className="buy-drop-stat">
                    <div className="buy-drop-stat-label">Collection Size</div>
                    <div className="buy-drop-stat-value">100 NFTs</div>
                  </div>
                  <div className="buy-drop-stat">
                    <div className="buy-drop-stat-label">Mint Price</div>
                    <div className="buy-drop-stat-value">0.2 ETH</div>
                  </div>
                  <div className="buy-drop-stat">
                    <div className="buy-drop-stat-label">Release Date</div>
                    <div className="buy-drop-stat-value">May 20, 2025</div>
                  </div>
                  <div className="buy-drop-stat">
                    <div className="buy-drop-stat-label">Whitelist Spots</div>
                    <div className="buy-drop-stat-value">50 remaining</div>
                  </div>
                </div>

                <div className="buy-drop-buttons">
                  <button className="btn-primary">Join Whitelist</button>
                  <button className="btn-secondary">Set Reminder</button>
                </div>
              </div>

              <div className="buy-drop-preview">
                <div className="buy-drop-preview-grid">
                  <img
                    src="/soc1.png"
                    alt="Preview 1"
                    className="buy-drop-preview-image"
                  />
                  <img
                    src="/soc11.jpg"
                    alt="Preview 2"
                    className="buy-drop-preview-image"
                  />
                  <img
                    src="/soc12.jpg"
                    alt="Preview 3"
                    className="buy-drop-preview-image"
                  />
                  <img
                    src="/soc15.jpg"
                    alt="Preview 4"
                    className="buy-drop-preview-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Create Your Own NFT */}
        <section className="buy-section">
          <div className="buy-create-container">
            <div className="buy-create-grid">
              <div className="buy-create-content">
                <h2 className="buy-create-title">Create Your Own NFT</h2>
                <p className="buy-create-description">
                  Are you an artist? Join our platform and start creating your
                  own Anime x Reality NFTs. Earn royalties and build your brand.
                </p>
                <div className="buy-create-buttons">
                  <button className="btn-primary">Start Creating</button>
                  <button className="btn-secondary">Learn More</button>
                </div>
              </div>
              <div className="buy-create-visual">
                <img
                  src="/buy.png"
                  alt="Create NFT"
                  className="buy-create-image"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Buy;
