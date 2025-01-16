import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import image from '../../../../public/assets/logo.png'
import { AuthContext } from '../../../Provider/AuthProvider';
import { TiShoppingCart } from "react-icons/ti";
import useCarts from '../../../Hooks/useCarts';
import useAdmin from '../../../Hooks/useAdmin';


const Navbar = () => {
  const {user, logOut} = useContext(AuthContext);
  const [cart] = useCarts();
  const [isAdmin] = useAdmin();


  const handleLogOut = () =>{
    logOut()
    .then(() => {})
    .catch(error => console.log(error));
  }
    const navOption = <>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/menu">Products</Link></li>
    <li><Link to="/order/salad">Order Products</Link></li>
    <li>
      <Link to="/dashboard/cart">
      <button className='flex mx-auto'>
      <TiShoppingCart className=' mr-2 w-6 h-6' />
      <div className="badge badge-secondary">+{cart.length}</div>
      </button>
      </Link>
    </li>

    {
      user ? <><button onClick={handleLogOut} className="btn btn-active btn-ghost">Log Out</button></> : <>
      <li><Link to="/login">Login</Link></li>
      </>
    }
    </>
    return (
        <div>
            <div className="navbar fixed z-10 bg-opacity-30 max-w-6xl text-white bg-black">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-black text-white rounded-box z-[1] mt-3 w-52 p-2 shadow">
        {navOption}
      </ul>
    </div>
    <div className='flex'>
    <img className='h-20 w-20' src={image} alt="" />
    <a className="btn btn-ghost text-xl text-white">product Hunt</a>
    </div>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {navOption}
    </ul>
  </div>
  <div className="navbar-end gap-4">
    {
      user && isAdmin && <Link to="/dashboard/adminHome"><span className='text-green-600'>{user?.displayName}</span></Link>
    }
    {
      user && !isAdmin && <Link to="/dashboard/userHome"><span className='text-green-600'>{user?.displayName}</span></Link>
    }
    
    <div className="avatar">
  <div className="w-12 rounded-full">
  <img src={user?.photoURL } alt="" />
  </div>
</div>
  </div>
</div>
        </div>
    );
};

export default Navbar;