import React,{useState,useEffect}from 'react'
import { toast } from 'react-toastify';
import {auth} from '../../Firebase'
import { useDispatch,useSelector} from 'react-redux';
import axios from 'axios'

const create = (authToken) =>{
    return axios.post(`/api/create`,{},{
      
        headers: {
            authToken,
        }
    })
}




const RegisterComplete=({history})=> {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const {user} =useSelector((state)=>({...state}))
    const dispatch = useDispatch()

     

    useEffect(()=> {
         setEmail(window.localStorage.getItem('emailForRegistration'))
    },[])

    const handleSubmit=async(e)=> {
        e.preventDefault()
        if(!email||!password){
            toast.error('Email and password are required')
            return;
        }
        if(password.length<6){
            toast.error('Password must be at least 6 characters')
            return
        }
        try{
              const results = await auth.signInWithEmailLink(email,window.location.href)
        
        if(results.user.emailVerified){
            window.localStorage.removeItem('emailForRegistration')
            let user = auth.currentUser
            await user.updatePassword(password)
            const idToken = await user.getIdTokenResult()

           // console.log(idToken,user)

            // redux
            create(idToken.token)
       .then((res) =>
       dispatch({
        type: 'LOGGED_IN_USER',
        payload: {
            email:res.data.email,
            token:idToken.token,
            name:res.data.name,
            role:res.data.role,
            _id:res.data._id,
                              }}))
       .catch((error) => {console.error(error)})
      

            history.push('/')


        }
    }
        catch(err) {
              console.error(err)
              toast.error(err.message)
        }
    }
    
    const completeRegistration=()=> 
         <form onSubmit={handleSubmit}>
             <input type="email" className="form-control" value={email}  disabled/>
             <input type="password" className="form-control" value={password} onChange={e=>setPassword(e.target.value)}></input>
             <button type="submit" className="btn btn-primary">Register</button>
         </form>
    
    return (
        <div className="container p-5">
            <div className="col-md-6 offset-md-3">
                <h4>Register Complete</h4>
                {completeRegistration()}
            </div>
        </div>
    )
}

export default RegisterComplete
