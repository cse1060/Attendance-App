import React, { useCallback, useEffect, useState } from "react";
import "../css/signup.css";
// import "../styles/Login.css";
import Particles from "react-particles";
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "tsparticles-slim";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import middleware from "../middleware/middleware"
import Cookkies from "js-cookie"
export default function Signup() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    username: "",
    password: "",
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

  const [error, setError] = useState("")
  async function submit() {
    const data = await axios.post("http://127.0.0.1:8000/login/", form)

    console.log(data.data)

    if (data.data.success === true) {
      Cookkies.set("token", data.data.token, { expires: 1 })
      Cookkies.set("username", form.username, { expires: 1 })
      console.log(data.data.token)
      navigate("/profile")
    } else {
      setError(data.data.message)
    }
  }

  const particlesInit = useCallback(async engine => {
    console.log(engine);
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async container => {
    await console.log(container);
  }, []);

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

  if (error.length > 0) {
    return (
      <h1>{error}</h1>
    )
  }

  return (
    <div>
      <Particles
        className="particles"
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          name: "Parallax",
          particles: {
            number: {
              value: 100,
              density: {
                enable: true,
              },
            },
            color: {
              value: "#ffffff",
            },
            shape: {
              type: "circle",
            },
            opacity: {
              value: {
                min: 0.1,
                max: 0.5,
              },
              animation: {
                enable: true,
                speed: 3,
                sync: false,
              },
            },
            size: {
              value: {
                min: 1,
                max: 10,
              },
              animation: {
                enable: true,
                speed: 20,
                sync: false,
              },
            },
            links: {
              enable: true,
              distance: 150,
              color: "#ffffff",
              opacity: 0.4,
              width: 1,
            },
            move: {
              enable: true,
              speed: 2,
            },
          },
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "grab",
                parallax: {
                  enable: true,
                  smooth: 10,
                  force: 60,
                },
              },
              onClick: {
                enable: true,
                mode: "push",
              },
            },
            modes: {
              grab: {
                distance: 400,
                links: {
                  opacity: 1,
                },
              },
              bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 0.8,
              },
              repulse: {
                distance: 200,
              },
              push: {
                quantity: 4,
              },
              remove: {
                quantity: 2,
              },
            },
          },
          background: {
            color: "#000011",
          },
        }}
      />
      <div className="background">
        {/* <div className="shape"></div>
        <div className="shape"></div> */}
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

          <button onClick={submit} className="btn btn-primary btn-block btn-large">
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
