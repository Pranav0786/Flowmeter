import React from "react";
import "./LogoHeader.css";

const LogoHeader = () => {
  return (
    <div className="logo-header">
      {/* Left Section */}
      <div className="logo-section">
        <img
          src="/krishna.png"
          alt="Krishna Valley Logo"
          className="logo-image"
        />
        <p className="section-title">महाराष्ट्र कृष्णा खोरे विकास महामंडळ</p>
        <div className="section-badge">
          <p>इंजी. चं. हह. पाटोळे
            अधीक्षक अभियंता
            सांगली पाटबंधारे मंडळ,
            सांगली</p>
        </div>
      </div>

      {/* Center Section */}
      <div className="logo-section center-section">
        <h1 className="main-heading">
          महाराष्ट्र शासन <br />
          जलसंपदा विभाग <br />
          महाराष्ट्र कृष्णा खोरे विभाग महामंडळ पुणे
        </h1>
        <button className="project-button">टेंभू उपसा सिंचन प्रकल्प</button>
      </div>

      {/* Right Section */}
      <div className="logo-section">
        <img
          src="/Seal.svg"
          alt="Maharashtra Seal Logo"
          className="logo-image"
        />
        <p className="section-title">जलसंपदा विभाग <br /> महाराष्ट्र शासन, भारत</p>
        <div className="section-badge">
          <p>श्री. अवभनंदन वि. हरगुडे
            कार्यकारी अवभर्ंता,
            टेंभू उपसाहसचन विभाग
            1, सांगली</p>
        </div>
      </div>
    </div>
  );
};

export default LogoHeader;

