import React from 'react'

export default function ProfileTemplate(props) {
    return (
        <div>
            <h1>This is the profile page</h1>
            {props.classes.length === 0 && <h1>No classes Found</h1>}
            {props.type === "teacher" | "tutuor" ? <button onClick={props.createNewClass}>Create Class</button> : <button onClick={props.joinNewClass}>Join Class</button>}
        </div>
    )
}
