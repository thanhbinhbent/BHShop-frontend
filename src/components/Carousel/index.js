import React from 'react';
import { Carousel } from 'antd';
import './Carousel.css';
import SourceImg from '@/assets/images';
function CarouselSlide() {
    const onChange = (currentSlide) => {};
    return (
        <div>
            <Carousel afterChange={onChange} autoplay swipeToSlide={true}>
                <div className="carousel-img">
                    <img src={SourceImg.slide1} alt="" />
                </div>
                <div className="carousel-img">
                    <img src={SourceImg.slide2} alt="" />
                </div>
            </Carousel>
        </div>
    );
}

export default CarouselSlide;
