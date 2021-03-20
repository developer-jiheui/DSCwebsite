import React from "react";

const Modal = () => {
  return (
    <div className="ui modal active">
      <div className="header">Header</div>
      <div className="description">
        Modals with image content must use the image content class in 2.0. This
        is to make sure flex-box rules do not affect regular content.
      </div>{" "}
      <div className="actions">
        <div className="ui black deny button">Nope</div>
        <div className="ui positive right labeled icon button">
          Yep, that's me
          <i className="checkmark icon"></i>
        </div>
      </div>
    </div>
  );
};

export default Modal;
