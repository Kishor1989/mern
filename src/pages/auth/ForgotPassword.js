import React,{useState,useEffect}from 'react'
import { toast } from 'react-toastify';
import {auth} from '../../Firebase'
import {Button} from 'antd'
import { useSelector} from 'react-redux';
import { Link } from 'react-router-dom';


const ForgotPassword=({history})=>{
    const [email,setEmail] = useState('')
    const [loading,setLoading]= useState(false)
    const {user} = useSelector((state)=>({...state}))


    useEffect(()=> {
        if(user && user.token) { history.push("/")}
        
     },[user])

   
 
    
    const handleSubmit=async(e)=> {
        e.preventDefault()
        setLoading(true)

        const config ={
           url:'http://localhost:3000/login',
          // url:process.env.REACT_APP_FORGOT_URL,
            handleCodeInApp: true,
        }

        await auth.sendPasswordResetEmail(email,config)
        .then(()=>{
             setEmail('')
             setLoading(false)
             toast.success('Success!')
        })

        .catch((err) => {
            console.error(err)
            toast.error(err.message)
            setLoading(false)
        })
    }

    return (
        <div className="col-md-6 offset-md-3 padding-5">
              {loading?<h4 className="text-danger">Loading</h4>:<h4>ForgotPassword</h4>}
              <form onSubmit={handleSubmit}>
                
                 <input type="email" className="form-control" value={email} onChange={e=>setEmail(e.target.value)}  autoFocus/>
                 <br/>
                 <button type="submit" className="btn btn-raised" disabled={!email}>Submit</button>
              </form>
        </div>
    )

}

export default ForgotPassword
