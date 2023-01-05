import React from "react";
import { useNavigate } from "react-router-dom";

function Tab(props) {
  const { addClass, content, icon, url, active, color } = props
  const navigate = useNavigate();

  return (
    <button
      className={`tab-button ${addClass}`}
      onClick={() => navigate(url)}
      style={
        { backgroundColor: active ? color : "" }
      }
    >
      <img src={icon} alt="" />
      <h3>{content}</h3>
    </button>
  )
}

export default Tab;
