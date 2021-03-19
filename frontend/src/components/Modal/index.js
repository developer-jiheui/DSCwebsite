import React from "react";

const Modal = ({ header, content, img }) => {
  return (
    <div className="ui modal">
      <div className="header">{header}</div>
    </div>
  );
};

export default Modal;
