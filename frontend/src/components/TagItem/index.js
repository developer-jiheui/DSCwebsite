import React from "react";

const TagItem = ({ item, clickFunction, id }) => {
  // Tags that will contain an "X" delete button and stack
  return (
    <>
      <div
        className="ui labelContainer"
        style={{ display: "inline-block", paddingTop: "1%" }}
      >
        <div className="ui right labeled icon button">
          {item}
          <i className="x icon" onClick={(e) => clickFunction(e, id)}></i>
        </div>
      </div>
    </>
  );
};

export default TagItem;
