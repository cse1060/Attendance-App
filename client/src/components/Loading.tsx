// Loading.js
import React from "react";
import "../css/loading.css";

const Loading = () => {
  return (
    <div className="loading-wrapper">
      <div className="loading-spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
