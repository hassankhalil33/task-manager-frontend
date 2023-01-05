import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import axios from "../api/axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const login = async (e) => {
    e.preventDefault();

    try {
      const data = {
        email: email.toLowerCase(),
        password: password
      }

      const response = await axios.post("/auth/login", data);
      console.log(response.data);

      localStorage.setItem("token", response.data.token)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  return (
    <section className="login-section">
      <form className="login-form">
        <h3>Task Manager</h3>

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
          content={"Sign In"}
          click={login}
        />

      </form>
    </section>
  )
}

export default Login;
