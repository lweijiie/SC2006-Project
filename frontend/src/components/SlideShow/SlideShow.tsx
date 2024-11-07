import React, { useState, useEffect } from "react";
import "./SlideShow.css";

interface SlideShowProps {
  slides: string[];
  interval?: number;
}

const SlideShow: React.FC<SlideShowProps> = ({ slides, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play the slideshow
  useEffect(() => {
    const autoSlide = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, interval);

    return () => clearInterval(autoSlide); // Clear interval on component unmount
  }, [interval, slides.length]);

  // Go to the previous slide
  const prevSlide = () => {
    setCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
  };

  // Go to the next slide
  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % slides.length);
  };

  return (
    <div className="slideshow">
      <div
        className="slide"
        style={{ backgroundImage: `url(${slides[currentIndex]})` }}
      >
        {/* Optional title or overlay content */}
      </div>

      {/* Navigation Buttons */}
      <button className="prev" onClick={prevSlide}>
        ❮
      </button>
      <button className="next" onClick={nextSlide}>
        ❯
      </button>

      {/* Indicator Dots */}
      <div className="dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default SlideShow;
