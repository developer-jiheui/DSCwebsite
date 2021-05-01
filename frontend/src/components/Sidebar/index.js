import React from "react";

const Sidebar = ({ toggle, itemList }) => {
  return (
    <div
      id="sidebar-hamburger-menu"
      className={`ui sidebar wide overlay right menu ${toggle ? "visible" : null
        }`}
    >
      <div className="ui list">{itemList}</div>
    </div>
  );
};

export default Sidebar;
