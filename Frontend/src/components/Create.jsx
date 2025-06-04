import React, { useState } from "react";
import "./Create.css";

const CreatePage = () => {
  const [activeTab, setActiveTab] = useState("post");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    tags: "",
    privacy: "public",
  });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile({
        name: file.name,
        url: URL.createObjectURL(file),
      });
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const tabs = [
    { id: "post", label: "New Post" },
    { id: "media", label: "Media Upload" },
    { id: "poll", label: "Create Poll" },
  ];

  const categories = [
    { value: "", label: "Select category..." },
    { value: "general", label: "💬 General Discussion" },
    { value: "tech", label: "💻 Technology" },
    { value: "creative", label: "🎨 Creative" },
    { value: "gaming", label: "🎮 Gaming" },
    { value: "music", label: "🎵 Music" },
  ];

  const privacyOptions = [
    { value: "public", label: " Public" },
    { value: "friends", label: " Friends Only" },
    { value: "private", label: " Private" },
  ];

  const tips = [
    {
      icon: "✅",
      iconClass: "green",
      title: "Use engaging titles",
      description: "Clear, descriptive titles get more engagement",
    },
    {
      icon: "⭐",
      iconClass: "purple",
      title: "Add relevant tags",
      description: "Help others discover your content",
    },
    {
      icon: "🕒",
      iconClass: "yellow",
      title: "Post at peak times",
      description: "More people are active in the evenings",
    },
  ];

  const stats = [
    { label: "Active Users", value: "2,847" },
    { label: "Posts Today", value: "156" },
    { label: "Your Posts", value: "23" },
    { label: "Total Likes", value: "1,203" },
  ];

  return (
    <div className="create-page">
      {/* Hero Header */}
      <div className="create-hero">
        <div
          className="create-hero-bg"
          style={{
            backgroundImage: `url('/soc8.jpg')`,
          }}
        />
        <div className="create-hero-overlay" />

        <div className="create-hero-content">
          <h1 className="create-hero-title">Create Something Amazing</h1>
          <p className="create-hero-subtitle">
            Share your thoughts, ideas, and creativity with our vibrant
            community. Every post is a chance to inspire and connect.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="create-main">
        {/* Tabs */}
        <div className="create-tabs">
          <div className="create-tabs-wrapper">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`create-tab-button ${
                  activeTab === tab.id ? "active" : ""
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="create-content-grid">
          {/* Form Column */}
          <div className="create-form-column">
            <div className="create-form-container">
              {/* Title */}
              <div className="create-form-group">
                <label className="create-form-label">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="create-form-input"
                  placeholder="Give your post an engaging title..."
                />
              </div>

              {/* Category and Privacy Row */}
              <div className="create-form-row">
                <div className="create-form-group">
                  <label className="create-form-label">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      handleInputChange("category", e.target.value)
                    }
                    className="create-form-select"
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="create-form-group">
                  <label className="create-form-label">Privacy</label>
                  <select
                    value={formData.privacy}
                    onChange={(e) =>
                      handleInputChange("privacy", e.target.value)
                    }
                    className="create-form-select"
                  >
                    {privacyOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="create-form-group">
                <label className="create-form-label">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  className="create-form-textarea"
                  placeholder="Share your thoughts, ideas, or ask questions..."
                />
                <p className="create-form-hint">
                  Markdown formatting supported. Be descriptive and engaging!
                </p>
              </div>

              {/* File Upload */}
              <div className="create-form-group">
                <label className="create-form-label">Attachments</label>
                <div className="create-file-upload-area">
                  <input
                    type="file"
                    id="file-upload"
                    className="create-file-input"
                    onChange={handleFileUpload}
                    accept="image/*,video/*,.pdf,.doc,.docx"
                  />
                  <div className="create-file-upload-content">
                    <div className="create-upload-icon"></div>
                    <p className="create-upload-text">
                      Drag & drop files here, or click to browse
                    </p>
                    <label
                      htmlFor="file-upload"
                      className="create-upload-button"
                    >
                      Choose Files
                    </label>
                    {uploadedFile && (
                      <p className="create-file-name">📎 {uploadedFile.name}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="create-form-group">
                <label className="create-form-label">Tags</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => handleInputChange("tags", e.target.value)}
                  className="create-form-input"
                  placeholder="Add tags separated by commas (e.g. react, javascript, coding)"
                />
                <p className="create-form-hint">
                  Tags help others discover your content
                </p>
              </div>

              {/* Submit Button */}
              <div className="create-submit-section">
                <button className="create-submit-button">Publish Post</button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="create-sidebar">
            {/* Preview Card */}
            <div className="create-card">
              <h3 className="create-card-title">Preview</h3>
              <div className="create-preview-container">
                {uploadedFile ? (
                  <img
                    src={uploadedFile.url}
                    alt="Preview"
                    className="create-preview-image"
                  />
                ) : (
                  <div className="create-preview-placeholder">🖼️</div>
                )}
              </div>
              <div className="create-preview-text">
                {formData.title || "Your title will appear here..."}
              </div>
            </div>

            {/* Tips Card */}
            <div className="create-card">
              <h3 className="create-card-title">💡 Tips for Great Posts</h3>
              <ul className="create-tips-list">
                {tips.map((tip, index) => (
                  <li key={index} className="create-tips-item">
                    <span className={`create-tips-icon ${tip.iconClass}`}>
                      {tip.icon}
                    </span>
                    <div className="create-tips-content">
                      <div className="create-tips-title">{tip.title}</div>
                      <div className="create-tips-description">
                        {tip.description}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Community Stats */}
            <div className="create-card create-stats-card">
              <h3 className="create-card-title">📊 Community Stats</h3>
              <div className="create-stats-list">
                {stats.map((stat, index) => (
                  <div key={index} className="create-stats-item">
                    <span className="create-stats-label">{stat.label}</span>
                    <span className="create-stats-value">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
