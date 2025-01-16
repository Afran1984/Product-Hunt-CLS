import React from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import featureImg from '../../../assets/home/featured.jpg';
import './Featured.css';

const Featured = () => {
    return (
        <div className='feature-item bg-fixed text-white pt-8 my-20'>
            <SectionTitle
            subHeading="check it Out"
            heading="Featured Item"
            ></SectionTitle>
            <div className='md:flex justify-center bg-slate-500 bg-opacity-60 items-center pb-20 pt-12 px-36'>
                <div>
                    <img src={featureImg} alt="" />
                </div>
                <div className='md:ml-10'>
                    <p>Aug 20, 2024</p>
                    <p className='uppercase'>Whare can i get some? </p>
                    <p>this food is best form fish fry & others this console & this iteam list show this Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti sed id aliquam quam possimus sapiente, error saepe temporibus. Fugit aliquam itaque magnam assumenda nemo sint odit quo mollitia deserunt. Molestias natus, aliquam magni nisi perferendis amet id tenetur odio accusamus ex error suscipit veniam assumenda? Necessitatibus libero nihil dicta nobis.</p>
                    <button className="btn btn-outline border-0 border-b-4 mt-4">Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;