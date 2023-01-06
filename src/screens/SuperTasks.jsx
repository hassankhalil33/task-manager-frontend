import React, { useState, useEffect } from "react";
import Super from "../components/Super";
import Popup from "../components/Popup";
import Button from "../components/Button";
import Table from "../components/Table";
import axios from "../api/axios";
import Input from "../components/Input";
import Select from "../components/Select";
import { Navigate } from "react-router-dom";

function SuperTasks() {
  const token = localStorage.getItem("token");
  const [refresh, setRefresh] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [newIsOpen, setNewIsOpen] = useState(false);
  const [updateIsOpen, setUpdateIsOpen] = useState(false);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [taskState, setTaskState] = useState("");
  const [assigneeId, setAssigneeId] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  }

  const toggleNewPopup = () => {
    setNewIsOpen(!newIsOpen);
  }

  const handleTaskState = (e) => {
    setTaskState(e.target.value);
  }

  const handleAssigneeId = (e) => {
    setAssigneeId(e.target.value);
  }

  const toggleUpdatePopup = (thisId) => {
    setUpdateIsOpen(!updateIsOpen);
    console.log(thisId);
    setId(thisId);
  }

  const getAllTasks = async () => {
    try {
      const response = await axios.get("/task", {
        headers: {
          Authorization: 'Bearer ' + token
        }
      });
      console.log(response.data);

      await setTasks(response.data.allTasks);

    } catch (err) {
      console.log(err.response.data)
    }
  }

  const createTask = async () => {
    const newTask = {
      title: title,
      description: description,
      assigneeId: assigneeId,
    }

    const headers = {
      Authorization: 'Bearer ' + token
    }

    for (const key of Object.keys(newTask)) {
      if (newTask[key] === "") {
        delete newTask[key];
      }
    }

    try {
      const response = await axios.post("/task", newTask, { headers });
      console.log(response.data);
      setNewIsOpen(!newIsOpen);
      setRefresh(!refresh);

    } catch (err) {
      console.log(err.response.data)
    }
  }

  const updateTask = async () => {
    const data = {
      id: id,
      title: title,
      description: description,
      assigneeId: assigneeId,
      status: taskState
    }

    console.log(data);

    for (const key of Object.keys(data)) {
      if (data[key] === "") {
        delete data[key];
      }
    }

    const headers = {
      Authorization: 'Bearer ' + token
    }

    try {
      const response = await axios.put("/task", data, { headers });
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
      const response = await axios.delete("/task", payload);
      console.log(response.data);
      setRefresh(!refresh);

    } catch (err) {
      console.log(err.response.data)
    }
  }

  useEffect(() => {
    getAllTasks();
  }, [refresh])

  if (!token) {
    return <Navigate to="/" />
  }

  return (
    <Super>
      <div className="admin-feed">
        <div>
          <h1>All Tasks</h1>
        </div>
        <section className="admin-lower-feed">
          <div>
            <Button
              className={"admin-feed-button"}
              content={"Add New Task"}
              click={toggleNewPopup}
            />
          </div>
          <Table
            headers={["ID", "Title", "Description", "Status", "AssigneeId", "Edit"]}
            contents={tasks}
            editButton={toggleUpdatePopup}
            deleteButton={deleteUser}
          />
        </section>
      </div>

      {newIsOpen &&
        <Popup
          content={<>
            <h2>Create New Task</h2>

            <div>
              <Input
                type={"text"}
                value={title}
                name={"title"}
                placeholder={"Title"}
                handleChange={handleTitleChange}
              />
              <Input
                type={"text"}
                value={description}
                name={"description"}
                placeholder={"Description"}
                handleChange={handleDescriptionChange}
              />
              <Input
                type={"text"}
                value={assigneeId}
                name={"AssigneeId"}
                placeholder={"AssigneeId (Optional)"}
                handleChange={handleAssigneeId}
              />
            </div>

            <Button
              content={"Create Task"}
              click={createTask}
            />
          </>}
          handleClose={toggleNewPopup}
        />
      }

      {updateIsOpen &&
        <Popup
          content={<>
            <h2>Update Task</h2>

            <div>
              <Input
                type={"text"}
                value={title}
                name={"title"}
                placeholder={"Title"}
                handleChange={handleTitleChange}
              />
              <Input
                type={"text"}
                value={description}
                name={"description"}
                placeholder={"Description"}
                handleChange={handleDescriptionChange}
              />
              <Input
                type={"text"}
                value={assigneeId}
                name={"AssigneeId"}
                placeholder={"AssigneeId (Optional)"}
                handleChange={handleAssigneeId}
              />
              <Select
                value={taskState}
                setValue={handleTaskState}
              />
            </div>

            <Button
              content={"Update Task"}
              click={updateTask}
            />
          </>}
          handleClose={toggleUpdatePopup}
        />
      }
    </Super>
  )
}

export default SuperTasks;
