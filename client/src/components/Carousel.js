import { register } from 'swiper/element/bundle';
import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './Carousel.css'; // Ajuste o caminho se necessário
import elegantHorse from '../img/eleganthorse.jpg';
import apresentacao6 from '../img/apresentacao6.jpg';
import apresentacao4 from '../img/apresentacao4.jpg';
import dressagehorse from '../img/dressagehorse.jpg';
import apresentacao1 from '../img/apresentacao1.jpg';

register();

function MySwiper() {
    const data = [
        { id: '1', imagem: elegantHorse },
        { id: '2', imagem: apresentacao6 },
        { id: '3', imagem: apresentacao4 },
        { id: '4', imagem: dressagehorse },
        { id: '5', imagem: apresentacao1 },
    ];

    return (
        <div className='container-slide'>
            <Swiper
                slidesPerView={2}
                spaceBetween={20}
                pagination={{ clickable: true }}
                navigation
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
            >
                {data.map((item) => (
                    <SwiperSlide key={item.id}>
                        <img
                            src={item.imagem}
                            alt="Slider"
                            className='slide-item'
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default MySwiper;
