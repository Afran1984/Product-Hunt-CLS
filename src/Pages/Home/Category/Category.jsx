import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// Image imports
import slider1 from '../../../../public/assets/21.png';
import slider2 from '../../../../public/assets/22.png';
import slider3 from '../../../../public/assets/23.png';
import slider4 from '../../../../public/assets/24.png';
import slider5 from '../../../../public/assets/25.png';

// Component import
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';

const Category = () => {
  // Image data array for dynamic rendering
  const images = [
    { src: slider1, alt: "Product Image 1" },
    { src: slider2, alt: "Product Image 2" },
    { src: slider3, alt: "Product Image 3" },
    { src: slider4, alt: "Product Image 4" },
    { src: slider5, alt: "Product Image 5" },
  ];

  return (
    <section>
      <SectionTitle
        subHeading="Product Hunt Ltd."
        heading="Product"
      />
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        centeredSlides={true}
        initialSlide={2} // Sets slider3 as the default slide
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="mySwiper mb-16"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image.src} alt={image.alt} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Category;
