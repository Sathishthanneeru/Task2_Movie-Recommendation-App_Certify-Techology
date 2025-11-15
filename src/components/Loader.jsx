import React from "react";

export default function Loader({ small }) {
  return (
    <div className={`mrapp-loader ${small ? "mrapp-loader-sm" : ""}`}>
      <div className="mrapp-pulse" />
      <div className="mrapp-pulse mrapp-pulse-delay" />
    </div>
  );
}
