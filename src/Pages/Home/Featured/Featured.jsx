// import React from 'react';
// import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
// import featureImg from '../../../../public/assets/07.png';
// import './Featured.css';

// const Featured = () => {
//     return (
//         <div className='feature-item bg-fixed text-white pt-8 my-20'>
//             <SectionTitle
//             subHeading="New Add Featured"
//             heading="Comming Soon...."
//             ></SectionTitle>
//             <div className='md:flex justify-center bg-slate-500 bg-opacity-60 items-center pb-20 pt-12 px-36'>
//                 <div>
//                     <img src={featureImg} alt="" />
//                 </div>
//                 <div className='md:ml-10'>
//                     <p>jan 17, 2025</p>
//                     <p className='uppercase'>Whare can i get some? </p>
//                     <p>Living Room: Cozy sofas, stylish coffee tables, and accent chairs create a welcoming space. Add rugs, cushions, and art for charm.
//                         Dining Room: Elegant dining table, comfortable chairs, and buffets enhance dining experiences.
//                         Bedroom: A comfortable bed, nightstands, and dressers ensure relaxation and functionality.</p>
//                     <button className="btn btn-outline border-0 border-b-4 mt-4">Order Now</button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Featured;

import React, { useState, useEffect } from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import featureImg from '../../../../public/assets/07.png';
import './Featured.css';

const Featured = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [offerStatus, setOfferStatus] = useState('upcoming'); // "upcoming", "running", or "ended"

    useEffect(() => {
        const startDate = new Date('2025-01-17T00:00:00'); // Start date
        const endDate = new Date('2025-02-02T23:59:59'); // End date

        const timer = setInterval(() => {
            const now = new Date();

            if (now < startDate) {
                // Offer hasn't started yet
                const difference = startDate - now;
                setOfferStatus('upcoming');
                updateTimeLeft(difference);
            } else if (now >= startDate && now <= endDate) {
                // Offer is running
                const difference = endDate - now;
                setOfferStatus('running');
                updateTimeLeft(difference);
            } else {
                // Offer has ended
                clearInterval(timer);
                setOfferStatus('ended');
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        }, 1000);

        return () => clearInterval(timer); // Cleanup on unmount
    }, []);

    const updateTimeLeft = (difference) => {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
    };

    return (
        <div className="feature-item bg-fixed text-white pt-8 my-20">
            <SectionTitle
                subHeading="New Add Featured"
                heading="Coming Soon...."
            ></SectionTitle>
            <div className="md:flex justify-center bg-slate-500 bg-opacity-60 items-center pb-20 pt-12 px-36">
                <div>
                    <img src={featureImg} alt="Featured Product" />
                </div>
                <div className="md:ml-10">
                    <p>Offer Period: January 17, 2025 - February 2, 2025</p>
                    <p className="uppercase">Where can I get some?</p>
                    <p>
                        Living Room: Cozy sofas, stylish coffee tables, and accent chairs create a welcoming space. Add rugs, cushions, and art for charm.
                        Dining Room: Elegant dining table, comfortable chairs, and buffets enhance dining experiences.
                        Bedroom: A comfortable bed, nightstands, and dressers ensure relaxation and functionality.
                    </p>
                    <div className="countdown mt-4">
                        <p className="text-lg font-bold">
                            {offerStatus === 'upcoming' && 'Offer Starts In:'}
                            {offerStatus === 'running' && 'Time Left:'}
                            {offerStatus === 'ended' && 'The offer has ended!'}
                        </p>
                        {offerStatus !== 'ended' && (
                            <p>
                                {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                            </p>
                        )}
                    </div>
                    {offerStatus === 'running' && (
                        <button className="btn btn-outline border-0 border-b-4 mt-4">Order Now</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Featured;
