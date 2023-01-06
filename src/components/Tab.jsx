import React from "react";
import { useNavigate } from "react-router-dom";

function Tab(props) {
  const { addClass, content, icon, url, active, color, logout } = props
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(url);
    logout && localStorage.clear("token");
  }

  return (
    <button
      className={`tab-button ${addClass}`}
      onClick={() => handleClick()}
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
