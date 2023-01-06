import React from "react";

function Popup(props) {
  const { handleClose, content } = props;

  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={handleClose}>x</span>
        {content}
      </div>
    </div>
  );
};

export default Popup;
