import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import img1 from '../../../../public/assets/11.png'
import img2 from '../../../../public/assets/12.png'
import img3 from '../../../../public/assets/13.png'
import img4 from '../../../../public/assets/14.png'
import img5 from '../../../../public/assets/15.png'
import img6 from '../../../../public/assets/18.png'


const Banner = () => {
    return (
        <Carousel>
                <div>
                    <img src={img1} />
                    
                </div>
                <div>
                    <img src={img2} />
                </div>
                <div>
                    <img src={img3} />
                </div>
                <div>
                    <img src={img4} />
                </div>
                <div>
                    <img src={img5} />
                </div>
                <div>
                    <img src={img6} />
                </div>
            </Carousel>
    );
};

export default Banner;