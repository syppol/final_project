import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import css from "./Slider.module.css";
import leftArrow from '../Assets/arrow-left.svg';
import rightArrow from '../Assets/arrow-right.svg';

const SliderComponent = ({ slides }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 300000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        }
      }
    ],
    prevArrow: (
      <button type="button" className={css.sliderArrow}>
        <img src={leftArrow} alt="Left Arrow" />
      </button>
    ),
    nextArrow: (
      <button type="button" className={css.sliderArrow}>
        <img src={rightArrow} alt="Right Arrow" />
      </button>
    ),
  };

  return (
    <div className={css.sliderWrapper}>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className={css.slide}>
            <div className={css.slideContent}>
              <div className={css.slideImage}>
                <img src={slide.img} alt={`Slide ${index + 1}`} />
              </div>
              <div className={`${css.slideText} ${css.textLeft}`}>{slide.text}</div>
            </div>
          </div>
        ))}
      </Slider>
    </div>


  );
};

export default SliderComponent;