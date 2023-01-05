import React from "react";

function Input(props) {
  const { type, placeholder, name, handleChange, value } = props;

  return (
    <input
      onChange={handleChange}
      value={value}
      type={type}
      name={name}
      placeholder={placeholder}
    />
  )
}

export default Input;
