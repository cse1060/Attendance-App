import React, { useState } from "react";
import "../css/signup.css";
import { useNavigate } from "react-router-dom";
export default function Signup() {
    const [form, setForm] = useState({
        username: "",
        password: "",
        email: ""
    });

    const navigate = useNavigate();
    const submit = async () => {
        navigate("/login")
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
