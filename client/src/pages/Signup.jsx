import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import middleware from '../middleware/middleware';
import Cookies from 'js-cookie';

export default function Signup() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    });

    async function verifyUser() {
        const res = await middleware();
        console.log(res);
        if (res === 1) {
            const username = Cookies.get("token")
            navigate(`/profile/${username}`)
        }
    }
    useEffect(() => {
        verifyUser();
    })

    const signup = async () => {
        console.log(user);
        const data = await axios.post("http://127.0.0.1:8000/signup/", user);
        console.log(data.data);
        if (data.data.success === true) {
            navigate("/login")
        }
    }

    return (
        <div>
            <label htmlFor='username'>Username</label>
            <input type="text" placeholder='username' value={user.username}
                onChange={(e) => { setUser({ ...user, username: e.target.value }) }}
            />
            <label htmlFor='email'>Email</label>
            <input type='email' placeholder='email' value={user.email}
                onChange={(e) => { setUser({ ...user, email: e.target.value }) }}
            />
            <label htmlFor='password' >Password</label>
            <input type="password" placeholder='password' value={user.password}
                onChange={(e) => { setUser({ ...user, password: e.target.value }) }}
            />
            <button onClick={signup}>Submit</button>
        </div>
    )
}
