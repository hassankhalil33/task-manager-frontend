import React, { useState, useEffect } from "react";
import Super from "../components/Super";
import Button from "../components/Button";
import Table from "../components/Table";
import axios from "../api/axios";
import { Navigate } from "react-router-dom";

function SuperUsers() {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await axios.get("/user", {
        headers: {
          Authorization: 'Bearer ' + token
        }
      });
      console.log(response.data);

      await setUsers(response.data.allUsers);

    } catch (err) {
      console.log(err.response.data)
    }
  }

  useEffect(() => {
    getAllUsers();
  }, [])

  if (!token) {
    return <Navigate to="/" />
  }

  return (
    <Super>
      <div className="admin-feed">
        <div>
          <h1>All Users</h1>
        </div>
        <section className="admin-lower-feed">
          <div>
            <Button
              className={"admin-feed-button"}
              content={"Add New User"}
            />
          </div>
          <Table
            headers={["ID", "Photo", "Email", "Type", "Edit"]}
            contents={users}
          />
        </section>
      </div>
    </Super>
  )
}

export default SuperUsers;
