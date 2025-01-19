import React from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import featureImg from '../../../../public/assets/07.png';
import './Featured.css';

const Featured = () => {
    return (
        <div className='feature-item bg-fixed text-white pt-8 my-20'>
            <SectionTitle
            subHeading="New Add Featured"
            heading="Comming Soon...."
            ></SectionTitle>
            <div className='md:flex justify-center bg-slate-500 bg-opacity-60 items-center pb-20 pt-12 px-36'>
                <div>
                    <img src={featureImg} alt="" />
                </div>
                <div className='md:ml-10'>
                    <p>jan 17, 2025</p>
                    <p className='uppercase'>Whare can i get some? </p>
                    <p>Living Room: Cozy sofas, stylish coffee tables, and accent chairs create a welcoming space. Add rugs, cushions, and art for charm.
                        Dining Room: Elegant dining table, comfortable chairs, and buffets enhance dining experiences.
                        Bedroom: A comfortable bed, nightstands, and dressers ensure relaxation and functionality.</p>
                    <button className="btn btn-outline border-0 border-b-4 mt-4">Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;
