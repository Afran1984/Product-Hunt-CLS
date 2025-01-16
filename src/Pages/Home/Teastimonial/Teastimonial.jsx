import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'

const Teastimonial = () => {
    const [reviwes, setReviwes] = useState([]);
    useEffect(()=>{
        fetch('https://84-foodbar-server.vercel.app/reviews')
        .then(res => res.json())
        .then(data => setReviwes(data))
    }, [])
    return (
        <section className='my-20'>
            <SectionTitle
            subHeading="What Our client Say!"
            heading="Testimonials"
            ></SectionTitle>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
            {
                reviwes.map(reviwe => <SwiperSlide
                key={reviwe._id}
                >
                    <div className='flex flex-col items-center m-24'>
                        <Rating
                            style={{ maxWidth: 180 }}
                            value={reviwe.rating}
                            readOnly
                        />
                        <p className='py-8'>{reviwe.details}</p>
                        <h3 className='text-2xl text-orange-400 text-center'>{reviwe.name}</h3>
                    </div>
                </SwiperSlide> )   
            }
      </Swiper>
        </section>
    );
};

export default Teastimonial;