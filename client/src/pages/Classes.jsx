import React from 'react'
import { useParams } from 'react-router-dom'

export default function Classes() {
    const { username, classname } = useParams();
    return (
        <div>
            This is a class of {username} with name {classname}
        </div>
    )
}
