// About.jsx
import React from "react";
import Layout from "./Layout";
import "./About.css";

const About = () => {
  const features = [
    {
      icon: "🎨",
      title: "Digital Art Revolution",
      description:
        "Transform traditional anime art into blockchain-secured NFTs with cutting-edge technology.",
    },
    {
      icon: "🌙",
      title: "Mikazuki Universe",
      description:
        "Explore a unique anime reality where digital and physical worlds converge seamlessly.",
    },
    {
      icon: "⚡",
      title: "Community Driven",
      description:
        "Built by anime enthusiasts, for anime enthusiasts. Join our growing community of creators.",
    },
    {
      icon: "🔮",
      title: "Future of Collecting",
      description:
        "Experience the next generation of anime collectibles with immersive AR/VR integration.",
    },
  ];

  const milestones = [
    {
      year: "2023",
      title: "Project Genesis",
      description:
        "Mikazuki anime*reality was conceived by a team of passionate anime creators and blockchain developers.",
    },
    {
      year: "2024",
      title: "Platform Launch",
      description:
        "Beta platform launched with initial collection of 1,000 unique anime NFTs.",
    },
    {
      year: "2024",
      title: "Community Growth",
      description:
        "Reached 15,000+ active community members across Discord and social platforms.",
    },
    {
      year: "2025",
      title: "Reality Bridge",
      description:
        "Introducing AR/VR features to bridge anime art with reality experiences.",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <div className="about-hero">
        <div className="hero-background">
          <img
            src="/soc13.jpg"
            alt="Mikazuki Background"
            className="hero-bg-image"
          />
        </div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Welcome to <span className="brand-text">Mikazuki</span>
              <br />
              <span className="subtitle-text">Anime X reality</span>
            </h1>
            <p className="hero-description">
              Where imagination meets innovation. We're building the future of
              anime collectibles through blockchain technology, creating a
              bridge between digital art and reality.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">15K+</span>
                <span className="stat-label">Community Members</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">5K+</span>
                <span className="stat-label">NFTs Created</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100+</span>
                <span className="stat-label">Artists</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Mission</h2>
            <p className="section-subtitle">
              Revolutionizing the anime industry through blockchain innovation
            </p>
          </div>
          <div className="mission-content">
            <div className="mission-text">
              <h3>Bridging Worlds</h3>
              <p>
                Mikazuki anime*reality is more than just an NFT marketplace.
                We're creating an ecosystem where anime artists, collectors, and
                fans can connect, create, and experience anime in entirely new
                ways.
              </p>
              <p>
                Our platform combines the emotional depth of anime storytelling
                with the security and ownership benefits of blockchain
                technology, creating unique digital experiences that transcend
                traditional boundaries.
              </p>
            </div>
            <div className="mission-visual">
              <div className="floating-elements">
                <div className="floating-element">🌙</div>
                <div className="floating-element">⭐</div>
                <div className="floating-element">🎨</div>
                <div className="floating-element">⚡</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What Makes Us Special</h2>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Journey</h2>
            <p className="section-subtitle">From concept to reality</p>
          </div>
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <div className="timeline-year">{milestone.year}</div>
                  <h3 className="timeline-title">{milestone.title}</h3>
                  <p className="timeline-description">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Join the Revolution?</h2>
            <p className="cta-description">
              Be part of the Mikazuki anime*reality community and help shape the
              future of anime collectibles.
            </p>
            <div className="cta-buttons">
              <button className="btn-primary">Start Creating</button>
              <button className="btn-secondary">Join Discord</button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
