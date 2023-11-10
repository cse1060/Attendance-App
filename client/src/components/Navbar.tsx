import React from 'react'
import "../css/classCard.css"
import Cookies from 'js-cookie'

export default function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg  bg-dark" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">AttendEase</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="#">Profile</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="#">Take Attendance</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" onClick={() => {
                                    Cookies.remove("token")
                                    Cookies.remove("username")
                                }} href="#">Logout</a>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
