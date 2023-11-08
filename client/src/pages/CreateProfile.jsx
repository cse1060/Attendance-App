import React, { useEffect, useState, useContext } from 'react'
import middleware from '../middleware/middleware';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import axios from 'axios';
import UploadWidget from '../components/UploadWidget';

export default function CreateProfile() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [userForm, setUserForm] = useState({ username: Cookies.get('token'), userType: "", name: "", iden: "", department: "", year: "", course: "" })

  async function verifyUser() {
    const res = await middleware();
    if (res === 0) {
      navigate("/login");
    }
    setLoading(false);
    await setUser(Cookies.get('token'))
    const data = await axios.get(`http://127.0.0.1:8000/create_profile/${user}`);
    if (data.data.isNew === false) {
      Cookies.set("usertype", data.data.user.type, { expires: 1 })
      navigate(`/profile/${user}`)
    }
  }

  useEffect(() => {
    verifyUser();
  }, [])

  var imgUrl = "";
  const [user, setUser] = useState(null);

  async function submitProfile(event) {
    event.preventDefault()
    // console.log(imgUrl , "image url ****")
    const data = await axios.post(`http://127.0.0.1:8000/create_profile/${user}/`, { user: userForm, img: imgUrl });
    Cookies.set("usertype", userForm.userType, { expires: 1 })
    console.log(data.data);
    navigate(`/profile/${user}`)
  }
  async function setImage(url) {
    imgUrl = url;
    console.log(imgUrl);
  }

  if (loading) {
    return (<>Loading</>)
  }
  return (
    <div>
      <h1>Welcome {user} , Its time to create your profile</h1>
      <button type="button" onClick={() => { setUserForm({ ...userForm, userType: "Teacher" }) }}>Teacher</button>
      <button type="button" onClick={() => { setUserForm({ ...userForm, userType: "Tutor" }) }}>Tutor</button>
      <button type="button" onClick={() => { setUserForm({ ...userForm, userType: "Student" }) }}>Student</button>

      <label htmlFor="name">name</label>
      <input type="text" placeholder='name' onChange={(e) => setUserForm({ ...userForm, name: e.target.value })} />
      <label htmlFor="identity">identity</label>
      <input type="text" placeholder='identity' onChange={(e) => setUserForm({ ...userForm, iden: e.target.value })} />
      <label htmlFor="department">department</label>
      <input type="text" placeholder='department' onChange={(e) => setUserForm({ ...userForm, department: e.target.value })} />

      {
        userForm.userType === "Student" &&
        (
          <>
            <label htmlFor="year">year</label>
            <input type="text" placeholder='year' onChange={(e) => setUserForm({ ...userForm, year: e.target.value })} />
            <label htmlFor="course">course</label>
            <input type="text" placeholder='course' onChange={(e) => setUserForm({ ...userForm, course: e.target.value })} />
            <UploadWidget imgUrl={setImage} />
          </>
        )
      }

      <button onClick={submitProfile}>Submit</button>
    </div>
  )
}
