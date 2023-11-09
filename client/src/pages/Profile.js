import React from "react";
import "../css/profile.css"
export default function Profile() {
  return (
    <>
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
    </>
  );
}
