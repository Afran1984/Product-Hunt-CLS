import React from 'react';
import useAuth from '../../../Hooks/useAuth';

const UserHome = () => {
    const {user} = useAuth(); 
    const {displayName, email, photoURL } = user;
    return (
        <div className='mx-5'>
            <h1 className='text-5xl text-center mt-4'>Dashboard</h1>
            <h2 className='text-3xl mt-4 mx-4'> <span className='text-green-500 '> Hi, Wellcome </span> 
            {
                user?.displayName ? user.displayName : 'Back'
            }
            </h2>
            <div className="card lg:card-side bg-base-100 shadow-xl mt-5">
                
                <figure>
                    <img className='p-3 w-full'
                    src={photoURL}
                    alt="Album" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{displayName}</h2>
                    <p>{email}</p>
                </div>
                </div>
        </div>
    );
};

export default UserHome;