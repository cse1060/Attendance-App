import React, { useState } from 'react'

export default function AddStudents() {

    const [link, setLink] = useState("");
    const [stuDetails, setStuDetails] = useState({ institute: "", course: "", year: "" })


    async function joinLink() {
        // setLink("Hello")
        // const linkData = await axios.get(`http://127.0.0.1:8000/get_link/${classDetails.username}/${}`)
    }

    async function getStudents() {
        // console.log(stuDetails);

    }

    return (
        <div>
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
        </div>
    )
}
