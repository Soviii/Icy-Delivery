import React from 'react';
import "./UnknownPage.css";

const UnknownPage = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-heading">Error 404: Page Not Found</h1>
      <p className="not-found-text">The page you are looking for doesn't exist.</p>
    </div>
  );
};

export default UnknownPage;
