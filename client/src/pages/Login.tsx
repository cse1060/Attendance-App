import React, { useState } from "react";
import "../css/signup.css";
import "../styles/Login.css";
export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

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
  // console.log("()",form);
  return (
    <div>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <div className="form">
        <form method="POST" onSubmit={printValue}>
          <h3>LOG IN</h3>

          <label htmlFor="username">Username</label>
          <input
            type="text"
            onChange={updateValue}
            value={form.username}
            placeholder="Username"
            required={true}
            name="username"
            id="username"
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

          <button type="submit" className="btn btn-primary btn-block btn-large">
            Submit
          </button>
          <h5>
            <br />
            Don't have a Account?<a href="/signup">Login</a>
          </h5>
        </form>
      </div>
    </div>
  );
}
