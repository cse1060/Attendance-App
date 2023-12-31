import React, { useState } from 'react'
import axios from 'axios';

export default function TakeAttendance() {

    const [classId, setClassId] = useState("1");
    const [selectedFile, setSelectedFile] = useState(null)

    async function submitForm(event){
        event.preventDefault();
        const data =await axios({
            url : "http://127.0.0.1:8000/take_attendance/",
            data : {class : classId , image : selectedFile[0]},
            method : 'POST',
            headers : {
                'Content-Type': 'multipart/form-data',
            }
        })
        // const data = await axios.post("http://127.0.0.1:8000/take_attendance/" , {class : classId , image : selectedFile} );
        console.log(data.data)
        console.log(selectedFile);
    }
  return (
    <div>
        <label htmlFor="image">Upload Image</label>
        <input accept="image/*" type="file" name="image" id="image_upload" files={selectedFile} onChange={(e)=>setSelectedFile(e.target.files)}/>
        <button onClick={submitForm} >Submit</button>
    </div>
  )
}
