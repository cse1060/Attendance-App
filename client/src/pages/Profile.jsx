import React, { useEffect, useState } from 'react'
import middleware from '../middleware/middleware';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import ProfileTemplate from '../components/ProfileTemplate';
import CreateClass from '../components/CreateClass';
import JoinClass from '../components/JoinClass';

export default function Profile() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null)
  const [type, setType] = useState("");
  const [classes, setClasses] = useState([]);
  const [mode, setMode] = useState("profile");

  async function verifyUser() {
    const res = await middleware();
    if (res === 0) {
      navigate("/login");
    } else {
      const username = await Cookies.get('token')
      const data = await axios.get(`http://127.0.0.1:8000/get_user/${username}`);
      setUser(data.data.user)
      setLoading(false);
      setType(data.data.user.type)
      setClasses(data.data.user.classes.classes)
    }
  }


  useEffect(() => {
    verifyUser();
  }, [])


  async function createNewClass() {
    setMode("createClass")
  }
  async function joinNewClass() {
    // console.log(user);
    setMode("joinClass")
  }

  if (loading) {
    return (<>Loading</>)
  }
  else if (mode === "profile") {
    return (
      <>
        <CreateClass username={user.username} />
        <ProfileTemplate
          type={type}
          classes={classes}
          createNewClass={createNewClass}
          joinNewClass={joinNewClass}
        />
      </>
    )
  } else if (mode === "createClass") {
    return (<CreateClass username={user.username} />)
  } else {
    return (<JoinClass />)
  }
}
