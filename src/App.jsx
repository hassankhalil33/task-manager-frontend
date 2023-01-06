import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import SuperTasks from "./screens/SuperTasks";
import SuperUsers from "./screens/SuperUsers";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/super" element={<SuperUsers />} />
        <Route path="/super/tasks" element={<SuperTasks />} />
      </Routes>
    </Router>
  );
}

export default App;
