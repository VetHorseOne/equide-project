import React, { useEffect, useState } from 'react';
import './Carousel.css'; // Importa os estilos do carrossel

// Importando as imagens diretamente
import elegantHorse from '../img/eleganthorse.jpg';
import apresentacao5 from '../img/apresentacao5.jpg';
import apresentacao6 from '../img/apresentacao6.jpg';
import apresentacao4 from '../img/apresentacao4.jpg';

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Defina os slides como um array de imagens
    const slides = [
        elegantHorse,
        apresentacao5,
        apresentacao6,
        apresentacao4
    ];

    const changeSlide = (index) => {
        if (index < 0) {
            index = slides.length - 1; // Vai para o último slide
        } else if (index >= slides.length) {
            index = 0; // Volta para o primeiro slide
        }
        setCurrentIndex(index);
    };

    useEffect(() => {
        const carouselInner = document.querySelector(".carousel-inner");
        if (carouselInner) {
            carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
    }, [currentIndex]);

    useEffect(() => {
        const interval = setInterval(() => {
            changeSlide(currentIndex + 1); // Avança para o próximo slide
        }, 3000);
        return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
    }, [currentIndex]);

    return (
        <div className="carousel">
            <div className="carousel-inner">
                {slides.map((src, index) => (
                    <div
                        className={`carousel-slide ${index === currentIndex ? "active" : ""}`}
                        key={index}
                    >
                        <img src={src} alt={`Slide ${index + 1}`} />
                    </div>
                ))}
            </div>
            <div className="carousel-indicators">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => changeSlide(index)}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default Carousel;