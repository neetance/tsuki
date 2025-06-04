import React, { useState, useEffect } from "react";
import "./RandomMint.css";

const RandomMintPage = () => {
  const [remaining, setRemaining] = useState(847);
  const [isMinting, setIsMinting] = useState(false);
  const [mintedNFT, setMintedNFT] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(0.08);
  const [showSuccess, setShowSuccess] = useState(false);

  const rarities = [
    { name: "Common", chance: "60%", color: "#9ca3af", glow: "#374151" },
    { name: "Rare", chance: "25%", color: "#22d3ee", glow: "#0891b2" },
    { name: "Epic", chance: "12%", color: "#a855f7", glow: "#7c3aed" },
    { name: "Legendary", chance: "3%", color: "#f59e0b", glow: "#d97706" },
  ];

  const sampleNFTs = [
    { id: 1, name: "Cyber Samurai", rarity: "Legendary", image: "🥷" },
    { id: 2, name: "Neon Dragon", rarity: "Epic", image: "🐉" },
    { id: 3, name: "Pixel Warrior", rarity: "Rare", image: "⚔️" },
    { id: 4, name: "Digital Ghost", rarity: "Common", image: "👻" },
  ];

  const handleMint = async () => {
    setIsMinting(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const randomNFT = sampleNFTs[Math.floor(Math.random() * sampleNFTs.length)];
    setMintedNFT(randomNFT);
    setRemaining((prev) => prev - 1);
    setShowSuccess(true);
    setIsMinting(false);

    setTimeout(() => {
      setShowSuccess(false);
      setMintedNFT(null);
    }, 5000);
  };

  const getRarityColor = (rarity) => {
    const rarityData = rarities.find((r) => r.name === rarity);
    return rarityData ? rarityData.color : "#9ca3af";
  };

  const progressPercentage = ((1000 - remaining) / 1000) * 100;

  return (
    <div>
      {/* Hero Section */}
      <section
        className="hero-section"
        style={{
          backgroundImage: "url('/soc.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          // filter: "blur(8px)",
        }}
      >
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <div className="hero-grid">
            {/* Left Side - Hero Content */}
            <div className="hero-left">
              <h1 className="hero-title">Random NFT Mint</h1>
              <p className="hero-description">
                Experience the thrill of minting a random Anime x Reality NFT!
                Each mint is a surprise with varying rarities and unique traits
                from our exclusive collection.
              </p>

              {/* Action Buttons */}
              <div className="action-buttons">
                <button
                  onClick={handleMint}
                  disabled={isMinting || remaining === 0}
                  className={`mint-button ${
                    isMinting || remaining === 0 ? "disabled" : ""
                  }`}
                >
                  {isMinting ? (
                    <>
                      <div className="spinner"></div>
                      Minting...
                    </>
                  ) : remaining === 0 ? (
                    "Sold Out"
                  ) : (
                    <>
                      <span>🎲</span>
                      Mint Random NFT
                    </>
                  )}
                </button>

                <button className="view-collection-button">
                  View Collection
                </button>
              </div>
            </div>

            {/* Right Side - Mint Interface */}
            <div className="mint-interface">
              {showSuccess && mintedNFT ? (
                <div className="success-content">
                  <div className="success-image">{mintedNFT.image}</div>
                  <h3 className="success-title">Congratulations!</h3>
                  <p className="success-text">
                    You minted: <strong>{mintedNFT.name}</strong>
                  </p>
                  <span
                    className="rarity-badge"
                    style={{
                      color: getRarityColor(mintedNFT.rarity),
                      backgroundColor: `${getRarityColor(mintedNFT.rarity)}20`,
                      borderColor: `${getRarityColor(mintedNFT.rarity)}40`,
                    }}
                  >
                    {mintedNFT.rarity} Rarity
                  </span>
                </div>
              ) : (
                <div className="mint-content">
                  {/* Price & Supply */}
                  <div className="price-supply-grid">
                    <div className="price-card">
                      <p className="price-label">Mint Price</p>
                      <p className="price-value">{currentPrice} ETH</p>
                    </div>
                    <div className="supply-card">
                      <p className="supply-label">Remaining</p>
                      <p className="supply-value">{remaining}/1000</p>
                    </div>
                  </div>

                  {/* Mystery Box */}
                  <div className="mystery-box">
                    <div
                      className={`mystery-icon ${isMinting ? "minting" : ""}`}
                    >
                      <div className="mystery-symbol">
                        {isMinting ? "🔄" : "❓"}
                      </div>
                    </div>
                    <h3 className="mystery-title">Mystery NFT</h3>
                    <p className="mystery-description">
                      {isMinting
                        ? "Revealing your NFT..."
                        : "Random rarity: Common, Rare, Epic, or Legendary"}
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="progress-section">
                    <div className="progress-header">
                      <span>Collection Progress</span>
                      <span>{Math.round(progressPercentage)}%</span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <div className="content-section">
        <div className="content-grid">
          {/* Sidebar */}
          <div className="sidebar">
            <div className="sidebar-content">
              <div className="rarity-guide">
                <h3 className="rarity-title">Rarity Guide</h3>
                <div className="rarity-list">
                  {rarities.map((rarity, index) => (
                    <div key={index} className="rarity-item">
                      <div className="rarity-info">
                        <div
                          className="rarity-dot"
                          style={{ backgroundColor: rarity.color }}
                        />
                        <span className="rarity-name">{rarity.name}</span>
                      </div>
                      <span className="rarity-chance">{rarity.chance}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Stats */}
              <div className="live-stats">
                <div className="stats-title">Live Stats</div>
                <div className="stats-list">
                  <div className="stat-row">
                    <span className="stat-label">Floor Price</span>
                    <span className="stat-value-small">0.05 ETH</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Volume</span>
                    <span className="stat-value-small">127 ETH</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Holders</span>
                    <span className="stat-value-small">324</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="main-content">
            <div className="content-header">
              <h2 className="collection-title">Collection Preview</h2>
              <input
                type="text"
                placeholder="Search NFTs..."
                className="search-input"
              />
            </div>

            {/* NFT Grid */}
            <div className="nft-grid">
              {sampleNFTs.map((nft) => (
                <div key={nft.id} className="nft-card">
                  <div className="nft-content">
                    <div className="nft-image">{nft.image}</div>
                    <h4 className="nft-name">{nft.name}</h4>
                    <span
                      className="nft-rarity"
                      style={{
                        color: getRarityColor(nft.rarity),
                        backgroundColor: `${getRarityColor(nft.rarity)}20`,
                        borderColor: `${getRarityColor(nft.rarity)}40`,
                      }}
                    >
                      {nft.rarity}
                    </span>
                  </div>
                </div>
              ))}

              {/* Placeholder cards */}
              {Array.from({ length: 5 }, (_, i) => (
                <div key={`placeholder-${i}`} className="nft-card placeholder">
                  <div className="nft-content">
                    <div className="placeholder-image">
                      <span>?</span>
                    </div>
                    <h4 className="placeholder-name">Coming Soon</h4>
                    <span className="placeholder-rarity">Mystery</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="pagination">
              <div className="pagination-buttons">
                {[1, 2, 3, 4, 5].map((page) => (
                  <button
                    key={page}
                    className={`page-button ${page === 1 ? "active" : ""}`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="newsletter-section">
        <div className="newsletter-card">
          <div className="newsletter-grid">
            <div className="newsletter-content">
              <h2 className="newsletter-title">Stay Updated</h2>
              <p className="newsletter-description">
                Get notified about new drops, exclusive mints, and community
                events.
              </p>
              <div className="newsletter-form">
                <input
                  type="email"
                  placeholder="Enter your email..."
                  className="email-input"
                />
                <button className="subscribe-button">Subscribe</button>
              </div>
            </div>
            <div className="newsletter-visual">
              <div className="newsletter-icon">🎁</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomMintPage;
