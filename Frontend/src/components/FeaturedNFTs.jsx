import React from "react";
import "./FeaturedNFTs.css";

function FeaturedNFTs() {
  const nftCards = [
    { id: 1, image: "/card1.png", title: "Cosmic Dreamer #024" },
    { id: 2, image: "/card2.png", title: "Digital Realm #103" },
    { id: 3, image: "/card3.png", title: "Neon Genesis #057" },
    { id: 4, image: "/card4.png", title: "Virtual Echo #211" },
    { id: 5, image: "/card5.png", title: "Cyber Punk #089" },
    { id: 6, image: "/card6.png", title: "Ethereal Mind #134" },
    { id: 7, image: "/card7.png", title: "Meta Wave #062" },
    { id: 8, image: "/card8.png", title: "Digital Soul #077" },
    { id: 9, image: "/card11.png", title: "Neo Artifact #112" },

    { id: 10, image: "/card12.png", title: "Future Relic #045" },
  ];

  const duplicatedCards = [...nftCards, ...nftCards];

  return (
    <section className="nft-banner">
      {/* Heading at the top */}
      <h1 className="featured-heading" data-content="FEATURED NFTs">
        FEATURED NFTs
      </h1>

      {/* Sliding NFT cards */}
      <div className="slider-container">
        <div className="slider">
          {duplicatedCards.map((nft, index) => (
            <div key={`${nft.id}-${index}`} className="item">
              <div className="nft-card">
                <img src={nft.image} alt={nft.title} />
                <div className="nft-info">
                  <h3>{nft.title}</h3>
                  <p className="price">4.2 ETH</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View All button below the cards */}
      <div className="view-all">
        <button className="btn-view-all">
          View All
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="arrow-icon"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}

export default FeaturedNFTs;
