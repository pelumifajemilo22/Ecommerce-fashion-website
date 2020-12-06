import React, { useState, useContext } from 'react';
import { GlobalState } from '../../components/GlobalState';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { FaCartPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios'

export default function Header() {
  const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [cart] = state.userAPI.cart
    const [menu, setMenu] = useState(false)


    const logoutUser = async () =>{
      await axios.get('/user/logout')
      
         localStorage.removeItem('firstLogin')
          
      window.location.href = "/";
  }

  const adminRouter = () =>{
      return(
          <>
              <li><Link to="/create_product">Create Product</Link></li>
              <li><Link to="/category">Categories</Link></li>
          </>
      )
  }

  const loggedRouter = () =>{
    return(
        <>
            <li><Link to="/history">History</Link></li>
            <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
        </>
    )
}

  const toggleMenu = () => setMenu(!menu)
const styleMenu = {
  left: menu ? 0 : "-100%"
}

  return (
    <div>
      <header>
        <div className='menu' onClick = {()=> setMenu(!menu)}>
          <FaBars />
        </div>

        <div className='logo'>
          <h1>
            <Link to='/'>{isAdmin ? 'Admin' : 'Shopping'}</Link>
          </h1>
        </div>
        <ul  style = {styleMenu}>
          <li>
            <Link to='/'>{isAdmin ? 'Products' : 'Shop'}</Link> </li>
            {isAdmin && adminRouter()}
            {
                isLogged ? loggedRouter() : <li><Link to='/login'>Login * Register</Link></li>
            }
         
       
          <li onClick = {()=> setMenu(!menu)}>
            <AiOutlineClose className='menu' />
          </li>
        </ul>
        {
            isAdmin ? '': <div className='cart-icon'>
            <span>{cart.length}</span>
            <Link to='/cart'>
              <FaCartPlus />
            </Link>
          </div>
        }
       
      </header>
    </div>
  );
}
