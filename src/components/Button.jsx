import React from "react";
import { useNavigate } from "react-router-dom";

function Button(props) {
  const { content, className, url, click } = props;
  const navigate = useNavigate();

  return (
    <button className={className} onClick={url ? (e) => {
      e.preventDefault();
      navigate(url);
    } : click}>{content}
    </button>
  )
}

export default Button;
