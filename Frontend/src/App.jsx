// new code
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Explore from "./components/Explore";

// Home page components
import Hero from "./components/Hero";
import FeaturedNFTs from "./components/FeaturedNFTs";
import RandomMint from "./components/RandomMint";
import ArtistSubscription from "./components/ArtistSubscription";
import ArtistDashboard from "./components/ArtistDashboard";
import ValidatorGovernance from "./components/ValidatorGovernance";
import Create from "./components/Create";
import DAO from "./components/DAO";
import Socials from "./components/Socials";
import Buy from "./components/Buy";
import About from "./components/About";

// Styles
import "./App.css";

// HomePage component that combines all home sections
function HomePage() {
  return (
    <div className="home-page">
      {/* Hero and FeaturedNFTs are wrapped in a container for seamless transition */}
      <div className="hero-featured-container">
        <Hero />
        <FeaturedNFTs />
      </div>

      {/* Other home page sections */}
      <RandomMint />
      <ArtistSubscription />
      <ArtistDashboard />
      <ValidatorGovernance />
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/About" element={<About />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/create" element={<Create />} />
            <Route path="/dao" element={<DAO />} />
            <Route path="/socials" element={<Socials />} />
            <Route path="/buy" element={<Buy />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
