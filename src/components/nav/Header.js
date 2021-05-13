import React,{useState} from 'react'
import firebase from 'firebase/app'
import { Menu } from 'antd';
import { LogoutOutlined, MailOutlined, SettingOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import {Link, useHistory} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'

const { SubMenu,Item } = Menu;

const  Header=()=> {
  
    const [current,setcurrent] =useState('home')

    const dispatch = useDispatch()
    let history = useHistory()
    let {user} = useSelector((state)=>({...state}))

    const handleClick=(e)=> {
        setcurrent(e.key)
    }

    const logout = ()=> {
        firebase.auth().signOut()
        dispatch({
            type: 'LOGGED_OUT_USER',
            payload:null,
        })
        history.push('/login')
    }

    return (
        <div>
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Item key="home" icon={<MailOutlined />}>
            <Link to='/'>Home</Link>
        </Item>

        {!user &&(
        <Item key="register" icon={<UserOutlined />} className="float-right">
        <Link to='/register'>Register</Link>
        </Item>)}

        {!user &&(
        <Item key="login" icon={<UserAddOutlined />} className="float-right">
        <Link to='/login'>Login</Link>
        </Item>)}
        
        {user &&(
        <SubMenu key="SubMenu" icon={<SettingOutlined />} title={user.email&&user.email.split('@')[0]} className="float-right">
            <Item key="setting:1">Option 1</Item>
            <Item key="setting:2">Option 2</Item>
            <Item icon={<LogoutOutlined/>} onClick={logout}>Logout</Item>
        </SubMenu>)}
        
      </Menu>
        </div>
    )
}

export default Header
