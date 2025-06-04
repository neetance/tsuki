import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="bg-black py-12 px-6" id="socials">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="logo mb-4">Mikazuki</div>
            <p className="text-gray-400 mb-4">
              Where Anime Meets Reality in the Blockchain Space
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-discord"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-telegram"></i>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Marketplace
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Collections
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Artists
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Random Mint
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  DAO
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Voting
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Validation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Discord
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Subscribe</h3>
            <p className="text-gray-400 mb-4">
              Get the latest updates on Mikazuki
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-gray-800 text-white px-4 py-2 rounded-l-lg w-full focus:outline-none"
              />
              <button className="bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-r-lg">
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">
            © 2025 Mikazuki NFT. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm">
              FAQ
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
