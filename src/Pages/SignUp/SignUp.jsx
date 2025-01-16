import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiousPublic from '../../Hooks/useAxiousPublic';
import SocialLogin from '../../Components/SocialLogin/SocialLogin';



const SignUp = () => {
  const axiousPublic = useAxiousPublic();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const {createUser, updateUserProfile} = useContext(AuthContext);
    const navigate = useNavigate();

  const onSubmit = data => {
    console.log(data);
    createUser(data.email, data.password)
    .then(result => {
      const loggedUser = result.user;
      console.log(loggedUser);
      updateUserProfile(data.name, data.photoURL)
      .then(() => {
        // create User
        const userInfo = {
          name: data.name,
          email: data.email,
          image: data.photoURL
        }
        axiousPublic.post('/users', userInfo)
        .then(res =>{
          if(res.data.insertedId){
            console.log('user add database');
            reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "successfully Create Account",
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/');
          }
        })
      })
      .catch(error => console.log(error))
    })
  }
    return (
        <>
        <Helmet>
                <title>84 Foodbar | Sign Up</title>
            </Helmet>
        <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Sign Up now!</h1>
      <p className="py-6">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" {...register("name", { required: true })} name='name' placeholder="Name" className="input input-bordered" required />
          {errors.name && <span>Name is required</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo Url</span>
          </label>
          <input type="text" {...register("photoURL", { required: true })} placeholder="Name" className="input input-bordered" required />
          {/* {errors.photourl && <span>Name is required</span>} */}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" {...register("email")} name='email' placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" {...register("password", { pattern: /^[a-zA-Z0-9!@#$%^&*]{6,16}$/ })} name='password' placeholder="password" className="input input-bordered"/>
          {errors.password?.type === 'pattern' && <span className='text-red-600'>[A-Z],[a-z]!@#$%^&*</span>}
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <input className="btn btn-primary" type="submit" value="Sign Up" />
        </div>
      </form>
      <SocialLogin></SocialLogin>
      <p className='p-2 text-center'><small>Already have a account?<Link to="/login"> <span className='text-red-600'>Login</span></Link> </small></p>
    </div>
  </div>
</div>
        </>
    );
};

export default SignUp;