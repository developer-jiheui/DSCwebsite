import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

import "./index.css";

const Dropdown = ({ label, itemList }) => {
  const [toggle, setToggle] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const onBodyClick = (e) => {
      if (dropdownRef.current && dropdownRef.current.contains(e.target)) return;
      setToggle(false);
    };

    document.body.addEventListener("click", onBodyClick);

    return () => {
      document.body.removeEventListener("click", onBodyClick);
    };
  }, []);

  const renderedItemList = itemList.map(({ label, icon, path }) => {
    return (
      <NavLink key={`${"dropdown. " + label}`} className="item" to={path}>
        <div className={`item`} key={`${"dropdown. " + label}`}>
          <i className={`${icon} icon`}></i> {label}
        </div>
      </NavLink>
    );
  });

  return (
    <>
      <div ref={dropdownRef}>
        <div
          className={`ui dropdown ${toggle ? "visible active" : null} item`}
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          <span className="text">{label}</span>
          <i className="dropdown icon" style={{ color: "black" }}></i>

          <div className={`menu ${toggle ? "visible transition" : null}`}>
            {renderedItemList}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dropdown;
