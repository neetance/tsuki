import React from "react";
import "./NFTCard.css";

function NFTCard({ nft }) {
  const {
    title,
    image,
    price,
    artist,
    artistAvatar,
    votes,
    rarity,
    rarityColor,
  } = nft;

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden transition-all duration-300 card-hover">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-64 object-cover" />
        <div
          className={`absolute bottom-2 left-2 ${rarityColor} text-white text-xs px-2 py-1 rounded-lg`}
        >
          {rarity}
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-lg">{title}</h3>
          <span className="text-purple-400">{price}</span>
        </div>
        <div className="flex items-center text-sm text-gray-400 mb-4">
          <img
            src={artistAvatar}
            alt="Artist avatar"
            className="w-6 h-6 rounded-full mr-2"
          />
          <span>{artist}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm">
            <i className="fas fa-thumbs-up text-green-400 mr-1"></i>
            <span>{votes} Votes</span>
          </div>
          <button className="bg-purple-700 hover:bg-purple-600 text-white text-sm px-3 py-1 rounded-lg">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default NFTCard;
