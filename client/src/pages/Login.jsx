import React, { useState , useEffect } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie" 
import middleware from '../middleware/middleware';

export default function Login() {
  const navigate = useNavigate();
  var res;
  async function verifyUser(){
    res = await middleware();
    console.log(res);
    if(res === 1){
      const username = Cookies.get("token")
      navigate(`/profile/${username}`)
    }
  } 
  useEffect(()=>{
    verifyUser(); 
  })

  const [user, setUser] = useState({
    username: "",
    password: ""
  });

  const [error , setError] = useState(false);
  const [token , setToken] = useState("");

  const login =async ()=>{
    console.log(user);
    const data = await axios.post("http://127.0.0.1:8000/login/" , user );
    console.log(data.data);
    if(data.data.error == 0){
      // navigate(`/profile/${user.username}`)
      navigate("/create_profile")
      Cookies.set("token", user.username , {expires : 1})
      Cookies.set("verifyToken", data.data.verifyToken , {expires : 1})
    }else{
      setError(true)
    }
  }
  if(error){
    return (
      <h1>User does not exist</h1>
    )
  }
  return ( 
    <div>
      <label htmlFor='username'>Username</label>
      <input type="text" placeholder='username' value={user.username}
        onChange={(e) => { setUser({ ...user, username: e.target.value }) }}
      />
      <label htmlFor='password' >Password</label>
      <input type="password" placeholder='password' value={user.password}
        onChange={(e) => { setUser({ ...user, password: e.target.value }) }}
      />
      <button onClick={login}>Submit</button>
    </div>
  )
}
