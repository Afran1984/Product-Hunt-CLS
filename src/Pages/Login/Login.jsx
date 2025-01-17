import React, { useContext, useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import SocialLogin from '../../Components/SocialLogin/SocialLogin';
import LogInLogo from '../../../public/assets/logo.png'

const Login = () => {

    const [disable, setDisable] = useState(true);
    const {signIn} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    useEffect(() =>{
        loadCaptchaEnginge(6); 
    },[])

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const capture = form.capture.value;
        console.log(email, password, capture);
        signIn(email, password)
        .then(result =>{
          const user = result.user;
          console.log(user);
          Swal.fire({
            title: "User Login Successful",
            showClass: {
              popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `
            },
            hideClass: {
              popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `
            }
          });
          navigate(from, { replace: true });
        })
    }
    const handleValidateCaptchar = (e) => {
        const user_capture_value = e.target.value;
       if(validateCaptcha(user_capture_value)){
            setDisable(false);
       }
       else{
        setDisable(true);
       }

    }

    return (
        <>
        <Helmet>
                <title>Product Hunt | Login</title>
            </Helmet>
        <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
  <div className="text-center mx-7 md:w-1/2 lg:text-left relative">
  <img className='mx-7 w-full' src={LogInLogo} alt="" />
  <h1 className="text-5xl absolute top-[-50px] left-[60px] font-serif">Login now!</h1>
</div>

    <div className="card bg-base-100 md:w-1/2 max-w-sm shadow-2xl">
      <form onSubmit={handleLogin} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name='email' placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name='password' placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control">
          <label className="label">
          <LoadCanvasTemplate />
          </label>
          <input onBlur={handleValidateCaptchar} type="text" name='capture' placeholder="Chapture" className="input input-bordered" required />
        </div>
        <div className="form-control mt-6">
          <input disabled={disable} className="btn btn-primary font-mono" type="submit" value="Login" />
        </div>
      </form>
      <SocialLogin className='p-2'></SocialLogin>
      <p className='p-2 text-center font-mono'><small>New Here? <Link to="/signup" className='text-red-700'>Create an account</Link></small></p>
    </div>
  </div>
</div>
        </>
    );
};

export default Login;