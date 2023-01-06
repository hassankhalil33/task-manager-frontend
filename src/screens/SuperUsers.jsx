import React, { useState, useEffect } from "react";
import Super from "../components/Super";
import Popup from "../components/Popup";
import Button from "../components/Button";
import Table from "../components/Table";
import axios from "../api/axios";
import Input from "../components/Input";
import Select from "../components/Select";
import { Navigate } from "react-router-dom";

function SuperUsers() {
  const token = localStorage.getItem("token");
  const [refresh, setRefresh] = useState(false);
  const [users, setUsers] = useState([]);
  const [newIsOpen, setNewIsOpen] = useState(false);
  const [updateIsOpen, setUpdateIsOpen] = useState(false);
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const toggleNewPopup = () => {
    setNewIsOpen(!newIsOpen);
  }

  const handleUserType = (e) => {
    setUserType(e.target.value);
  }

  const toggleUpdatePopup = (thisId) => {
    setUpdateIsOpen(!updateIsOpen);
    console.log(thisId);
    setId(thisId);
  }

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

  const createUser = async () => {
    const newUser = {
      email: email,
      password: password
    }

    try {
      const response = await axios.post("/auth/register", newUser);
      console.log(response.data);
      setNewIsOpen(!newIsOpen);
      setRefresh(!refresh);

    } catch (err) {
      console.log(err.response.data)
    }
  }

  const updateUser = async () => {
    console.log(id);
    const data = {
      id: id,
      email: email,
      password: password,
      user_type: userType
    }

    for (const key of Object.keys(data)) {
      if (data[key] === "") {
        delete data[key];
      }
    }

    console.log(data);

    const headers = {
      Authorization: 'Bearer ' + token
    }

    try {
      const response = await axios.put("/user", data, { headers });
      console.log(response.data);
      setUpdateIsOpen(!updateIsOpen);
      setRefresh(!refresh);

    } catch (err) {
      console.log(err.response.data)
    }
  }

  const deleteUser = async (deleteId) => {
    const payload = {
      data: {
        id: deleteId
      },

      headers: {
        Authorization: 'Bearer ' + token
      }
    }

    try {
      const response = await axios.delete("/user", payload);
      console.log(response.data);
      setRefresh(!refresh);

    } catch (err) {
      console.log(err.response.data)
    }
  }

  useEffect(() => {
    getAllUsers();
  }, [refresh])

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
              click={toggleNewPopup}
            />
          </div>
          <Table
            headers={["ID", "Photo", "Email", "Type", "Edit"]}
            contents={users}
            editButton={toggleUpdatePopup}
            deleteButton={deleteUser}
          />
        </section>
      </div>

      {newIsOpen &&
        <Popup
          content={<>
            <h2>Create New User</h2>

            <div>
              <Input
                type={"text"}
                value={email}
                name={"email"}
                placeholder={"Email"}
                handleChange={handleEmailChange}
              />
              <Input
                type={"password"}
                value={password}
                name={"password"}
                placeholder={"Password"}
                handleChange={handlePasswordChange}
              />
            </div>

            <Button
              content={"Create User"}
              click={createUser}
            />
          </>}
          handleClose={toggleNewPopup}
        />
      }

      {updateIsOpen &&
        <Popup
          content={<>
            <h2>Update User</h2>

            <div>
              <Input
                type={"text"}
                value={email}
                name={"email"}
                placeholder={"Email"}
                handleChange={handleEmailChange}
              />
              <Input
                type={"password"}
                value={password}
                name={"password"}
                placeholder={"Password"}
                handleChange={handlePasswordChange}
              />
              <Select
                user={true}
                value={userType}
                setValue={handleUserType}
              />
            </div>

            <Button
              content={"Update User"}
              click={updateUser}
            />
          </>}
          handleClose={toggleUpdatePopup}
        />
      }
    </Super>
  )
}

export default SuperUsers;
