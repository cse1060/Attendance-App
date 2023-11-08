import React,{useState} from 'react'
import { ReactDOM } from 'react'
import '../styles/Login.css'
function Login() {

    const [form, setForm] = useState({
        name: "",
        password: "",        
    })
    function updateValue(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }
    function printValue(e) {
        e.preventDefault();
        console.log(JSON.stringify(form));
    }
    return (
        <>
            <div>
                
                <div className="login">
                <h1>Login</h1>
                <form method="post" onSubmit={printValue}>
                    <input placeholder="Name"value={form.name} type='text' onChange={updateValue} required={true} name='name'/>
                    <input placeholder='Password' value={form.password} onChange={updateValue} required={true} type='password' name='password' />
                    <button type="submit" className="btn btn-primary btn-block btn-large">Submit</button>
                    </form>
                {/* <h4 className>Already Have a account<Link></Link></h4> */}
                </div>
            </div>
      </>
  )
}


export default Login;