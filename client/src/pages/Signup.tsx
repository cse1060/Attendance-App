import React, { useEffect, useState } from "react";
import "../css/signup.css";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import axios from "axios"
import middleware from "../middleware/middleware"

export default function Signup() {

  const [error, setError] = useState("")

  const [form, setForm] = useState({
    username: "",
    password: "",
    email: ""
  });

  async function verifyUser() {
    const res = await middleware();
    console.log(res);

    if (res === false) {
      navigate("/profile")
    }
  }

  useEffect(() => {
    verifyUser();
  }, [])

  const navigate = useNavigate();
  const submit = async () => {

    const data = await axios.post("http://127.0.0.1:8000/signup/", form)

    console.log(data.data);

    if (data.data.success === true) {
      navigate("/login")
    } else {
      setError(data.data.message)
    }
    // console.log(form);

  }

  function updateValue(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }
  function printValue(e) {
    e.preventDefault();
    console.log(JSON.stringify(form));
  }

  if (error.length > 0) {
    return (
      <h1>{error}</h1>
    )
  }
  // console.log("()",form);
  return (
    <div>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <div className="form">
        <form method="POST" onSubmit={printValue}>
          <h3>Sign Up</h3>

          <label htmlFor="username">Username</label>
          <input
            type="text"
            onChange={updateValue}
            value={form.username}
            placeholder="username"
            required={true}
            name="username"
            id="username"
          />
          <label htmlFor="username">Email</label>
          <input
            type="text"
            onChange={updateValue}
            value={form.email}
            placeholder="Email"
            required={true}
            name="email"
            id="email"
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={form.password}
            placeholder="Password"
            required={true}
            name="password"
            onChange={updateValue}
            id="password"
          />

          <button type="submit" onClick={submit} className="btn btn-primary btn-block btn-large">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}
