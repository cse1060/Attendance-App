import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function CreateClass(props) {

    const navigate = useNavigate();

    const username = props.username
    const [classDetails, setClassDetails] = useState({ owner: username, name: "", description: "", classPassword: "" });

    async function createClass() {
        const res = await axios.post(`http://127.0.0.1:8000/create_class/`, classDetails)
        console.log(res.data);
        if (res.data.success === false) {
            console.log(res.data.message)
        }
        else {
            navigate(`/${username}/classes/${classDetails.name}`)
        }
    }

    return (
        <div>
            Create new Class
            <label htmlFor='name' >Class Name</label>
            <input type='text' name="name" onChange={(e) => {
                setClassDetails({ ...classDetails, name: e.target.value })
            }} />
            <label htmlFor='description' >Description</label>
            <input type='text' name="description" onChange={(e) => {
                setClassDetails({ ...classDetails, description: e.target.value })
            }} />
            <br />
            <label htmlFor='password' >Class Password</label>
            <input type='text' name="classPassword" onChange={(e) => {
                setClassDetails({ ...classDetails, classPassword: e.target.value })
            }} />
            <button onClick={createClass}>Create Class</button>
            <hr />

        </div>
    )
}