import React,{useEffect}from 'react';
import {Switch, Route } from 'react-router-dom';
import Header from './components/nav/Header';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import RegisterComplete from './pages/auth/RegisterComplete';



import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {auth} from './Firebase'
import {useDispatch} from 'react-redux'
import ForgotPassword from './pages/auth/ForgotPassword';


const  App=()=> {
  const dispatch = useDispatch()

  useEffect(()=>{
     const unsubscribe = auth.onAuthStateChanged(async(user)=>{      // to avoid memory leaks
           if(user){
             const idToken = await user.getIdTokenResult()
              console.log(user)
             dispatch({
               type: 'LOGGED_IN_USER',
               payload:{
                 email:user.email,
                 token:idToken.token
               }
             })
           }
     })
     return()=> unsubscribe()
  },[])
    return (
      <>
      <Header/>
      <ToastContainer/>
      <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/register" component={Register}/>
      <Route exact path="/register/complete" component={RegisterComplete}/>
      <Route exact path="/forgot/password" component={ForgotPassword}/>

    </Switch>
    </>
    )
}
  


export default App;
