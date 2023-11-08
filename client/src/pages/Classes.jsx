import React, { useState, useEffect } from 'react'
import middleware from '../middleware/middleware';
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import ClassStudents from '../components/ClassStudents';

export default function Classes() {
    const navigate = useNavigate();

    const { username, classname } = useParams();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null)
    const [mode, setMode] = useState("attendance")
    const [type, setType] = useState("");


    async function verifyUser() {
        const res = await middleware();
        if (res === 0) {
            navigate("/login");
        } else {
            const data = await axios.get(`http://127.0.0.1:8000/get_user/${username}`);
            setUser(data.data.user)
            setLoading(false);
            setType(data.data.user.type)
        }
    }

    useEffect(() => {
        verifyUser();
        console.log(mode)
    }, [])

    if (mode === "students") {
        return (
            <div>
                <button onClick={() => { setMode("students") }}>Students</button>
                <button onClick={() => setMode("attendance")}>Attendance</button>
                <br />
                <ClassStudents /*type={type}*/ type="teacher" />
            </div>
        )
    } else if (mode === "attendance") {
        return (
            <div>
                <button onClick={() => { setMode("students") }}>Students</button>
                <button onClick={() => setMode("attendance")}>Attendance</button>
                <br />
                <p>This is the attendance mode</p>
            </div>
        )
    }

}
