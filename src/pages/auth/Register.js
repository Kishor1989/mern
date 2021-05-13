import React,{useState}from 'react'
import { toast } from 'react-toastify';
import {auth} from '../../Firebase'


const Register=()=> {
    const [email,setEmail] = useState('')

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const config ={
            //url:'http://localhost:3000/register/complete',
            url:process.env.REACT_APP_REDIRECT_URL,
            handleCodeInApp: true,
        }

        await auth.sendSignInLinkToEmail(email,config)
        toast.success(`Email is send to ${email}.Click to complete Register`)
        window.localStorage.setItem('emailForRegistration',email)
        setEmail('')


    }

    const registerForm=()=> 
         <form onSubmit={handleSubmit}>
             <input type="email" className="form-control" value={email} onChange={e=>setEmail(e.target.value)} autoFocus/>
             <button type="submit" className="btn btn-primary">Register</button>
         </form>
    
    return (
        <div className="container p-5">
            <div className="col-md-6 offset-md-3">
                <h4>Register</h4>
                {registerForm()}
            </div>
        </div>
    )
}

export default Register
