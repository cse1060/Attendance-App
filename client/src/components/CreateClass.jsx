import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function CreateClass(props) {

    const navigate = useNavigate();

    const username = props.username
    const [classDetails, setClassDetails] = useState({ owner: username, name: "", description: "" });
    const [link, setLink] = useState("");
    const [stuDetails, setStuDetails] = useState({ institute: "", course: "", year: "" })

    async function joinLink() {
        // setLink("Hello")
        // const linkData = await axios.get(`http://127.0.0.1:8000/get_link/${classDetails.username}/${}`)
    }

    async function getStudents() {
        // console.log(stuDetails);

    }

    async function createClass() {
        await axios.post(`http://127.0.0.1:8000/create_class/`, classDetails)
        // navigate("/classes")
    }

    return (
        <div>
            Create new Class
            <label htmlFor='name' >Class Name</label>
            <input type='text' name="name" onChange={(e) => {
                setClassDetails({ ...classDetails, name: e.target.value })
            }} />
            <label htmlFor='description' >Year</label>
            <input type='text' name="description" onChange={(e) => {
                setClassDetails({ ...classDetails, description: e.target.value })
            }} />
            <hr />
            <h3>Add students</h3>
            <ul>
                <li>Add students via invite link
                    {link.length == 0 ?
                        <button onClick={joinLink}>Generate join Link</button> :
                        <h5>{link}</h5>
                    }
                </li>
                <li>
                    Add students via details
                    <label htmlFor='institute'>Institute</label>
                    <input type="text" name="institute" id="" onChange={(e) => {
                        setStuDetails({ ...stuDetails, institute: e.target.value })
                    }} />
                    <label htmlFor='course' >Course</label>
                    <input type='text' name="course" onChange={(e) => {
                        setStuDetails({ ...stuDetails, course: e.target.value })
                    }} />
                    <label htmlFor='year' >Year</label>
                    <input type='text' name="year" onChange={(e) => {
                        setStuDetails({ ...stuDetails, year: e.target.value })
                    }} />
                    <button onClick={getStudents} >Get Students</button>
                </li>
            </ul>
            <button onClick={createClass}>Create Class</button>

        </div>
    )
}