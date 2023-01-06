import React from "react";

function Select(props) {
  const { user } = props;

  return (
    user ?
      <select required name="usertype" className="select-form">
        < option value="" disabled selected > Type</option >
        <option value="NORMAL">Normal</option>
        <option value="ADMIN">Admin</option>
        <option value="SUPER_ADMIN">Super Admin</option>
      </select >
      :
      <select required name="task" className="select-form">
        <option value="" disabled selected>Type</option>
        <option value="PENDING">Pending</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="COMPLETED">Completed</option>
      </select>
  )
}

export default Select;
