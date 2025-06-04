// new code
import React from "react";
import "./Hero.css";

function Hero() {
  return (
    <div className="hero-section">
      <div className="hero-video-container">
        <video className="hero-video" autoPlay loop muted playsInline>
          <source src="/gojo.mp4" type="video/mp4" />
          <source src="/all.mp4" type="video/mp4" />
        </video>

        {/* Gradient overlay to blend with the next section */}
        <div className="hero-gradient-overlay"></div>

        {/* Japanese text */}
        <div className="japanese-container">
          <div className="main-jp-text">未来月</div>
          <div className="sub-jp-text">アニメNFTの世界</div>
        </div>

        <div className="hero-overlay">
          <h2 className="text-xl uppercase text-gray-300 mb-1">
            ENTER THE REALM
          </h2>
          <h1 className="text-3xl font-bold mb-4 uppercase">
            ANIME REALITY FUSION
          </h1>
          <button className="watch-button">WATCH</button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
