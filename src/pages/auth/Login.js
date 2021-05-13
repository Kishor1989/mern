import React,{useState,useEffect}from 'react'
import { toast } from 'react-toastify';
import {auth, googleauthProvider} from '../../Firebase'
import {Button} from 'antd'
import {  MailOutlined,GooglePlusOutlined } from '@ant-design/icons';
import { useDispatch,useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios'


const create = (authToken) =>{
    return axios.post(`http://localhost:6000/api/create`,{},{
      
        headers: {
            authToken,
        }
    })
}


const Login=({history})=> {
    const [email,setEmail] = useState('kishor.gunjal1989@gmail.com')
    const [password,setPassword] = useState('1234567')
    const [loadings,setLoadings] = useState(false)
    const dispatch = useDispatch()
   const {user} = useSelector((state)=>({...state}))


    useEffect(()=> {
        if(user && user.token)  history.push("/")
        
     },[])


const googleLogin=async()=>{
     auth.signInWithPopup(googleauthProvider).then(result=>{
         const {user} = result;
         const idToken =  user.getIdTokenResult()
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
  
         
     })
     .catch(err =>{
         console.error(err)
         toast.error(err.message)
     })
}

const handleSubmit=async(e)=>{
        e.preventDefault()
        setLoadings(true)
try{
   const result =await auth.signInWithEmailAndPassword(email,password)
       //console.log(result)

       const {user} = result;
       const idToken = await user.getIdTokenResult()

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
catch(err){
        console.error(err)
        toast.error(err.message)
        setLoadings(false)
        console.log(setLoadings)
}


   }

    const loginForm=()=> 
         <form onSubmit={handleSubmit}>
             <input type="email" className="form-control" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email"/>
             <input type="password" className="form-control" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password"/>
             <br/>
             <Button onClick={handleSubmit}
             type="primary" block shape="round" icon={<MailOutlined/>} disabled={!email||password.length<6}
             className="mb-3"
             >Login</Button>
         </form>
    
    return (
        <div className="container p-5">
            <div className="col-md-6 offset-md-3">
                {loadings?(<h4 className="text-danger">Loading...</h4>):(<h4>Login</h4 >)}
                {loginForm()}
                <Button onClick={googleLogin}
               type="danger" block shape="round" icon={<GooglePlusOutlined />} 
               className="mb-3">Google Login</Button>
                
                <Link to="/forgot/password" className="float-right">Forgot Password</Link>

            </div>
        </div>
    )
}

export default Login
