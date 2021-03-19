import React from "react";

const Sidebar = ({ toggle, itemList }) => {
  return (
    <div
      className={`ui sidebar thin overlay right inverted menu ${
        toggle ? "visible" : null
      }`}
    >
      <div className="ui list">{itemList}</div>
    </div>
  );
};

export default Sidebar;
