import React, { useContext } from 'react';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAxiousSecure from '../../Hooks/useAxiousSecure';
import useCarts from '../../Hooks/useCarts';

const FoodCard = ({item}) => {
    const {name, image, price, recipe, _id} = item;
    const {user} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiousSecure = useAxiousSecure();
    const [, refetch] = useCarts();

    const handleAddToCart = ()=>{
      if(user && user.email){
        // send to server & database
        const cardItem = {
          menuId: _id,
          email: user.email,
          name,
          image,
          price,
          recipe
        }
        axiousSecure.post('/carts', cardItem)
        .then(res => {
          console.log(res.data);
          if(res.data.insertedId){
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${name} Added to your Cards`,
              showConfirmButton: false,
              timer: 1500
            });
            // refetch cart to update the cart
            refetch();
          }
        })

        
      }
      else{
        Swal.fire({
          title: "You are not logged In",
          text: "Please Login Add to Card",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Login"
        }).then((result) => {
          if (result.isConfirmed) {
            // send to Login page
            navigate('/login', {state: {from: location}})
          }
        });
      }
    }

    return (
        <div className="card bg-base-100 shadow-xl">
  <figure className="px-10 pt-10">
    <img
      src={image}
      alt="Shoes"
      className="rounded-xl" />
  </figure>
  <p className='absolute right-0 mr-4 mt-4 px-4 bg-slate-900 text-white'>${price}</p>
  <div className="card-body flex flex-col items-center">
    <h2 className="card-title">{name}</h2>
    <p>{recipe}</p>
    <div className="card-actions">
      <button onClick={handleAddToCart} className="btn btn-outline bg-slate-200 border-orange-400 border-0 border-b-4 mt-4">Add to Card</button>
    </div>
  </div>
</div>
    );
};

export default FoodCard;