import React from 'react'
import AddStudents from './AddStudents'

export default function ClassStudents(props) {

    return (
        <div>
            {props.type === "teacher" ? <AddStudents /> : "You are a student"}
            <hr />

        </div>
    )
}
