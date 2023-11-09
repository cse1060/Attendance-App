import React, { useEffect } from 'react'
import "../css/profile.css"
import ClassCard from '../components/ClassCard'
import middleware from "../middleware/middleware.js"
import { useNavigate } from 'react-router-dom'

export default function Profile() {

    const navigate = useNavigate();
    async function verifyUser() {
        const res = await middleware();
        if (res === false) {
            navigate("/login")
        }
    }


    useEffect(() => {
        verifyUser();
    }, [])


    return (
        <div className='profile'>
            <ClassCard />
            <div class="main">
                <button class="buton" onclick="logout()">Logout</button>
                <center>
                    <h1 className="head">User Profile</h1>

                    <div class="flex-container">
                        <div><button class="github-button">CS201</button></div>
                        <div><button class="github-button">CS 203</button></div>
                        <div><button class="github-button">CS 207</button></div>
                    </div>
                </center>
            </div>
        </div>
    )
}
