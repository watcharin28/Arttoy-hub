import React, { useState, useEffect } from 'react';

const Banner = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    "/images/Pr.png",
    "/images/AThub.png",
    "/images/Pr.png",
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [currentImage]);

  const goToPrevImage = () => {
    setCurrentImage((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToNextImage = () => {
    setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="relative h-64 md:h-96 bg-yellow-100 flex items-center justify-center overflow-hidden shadow-lg max-w-full">
      {/* Previous Button */}
      <button
        onClick={goToPrevImage}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white bg-gradient-to-r from-violet-600 to-violet-400 p-1 rounded-full shadow-md hover:scale-105 transition-transform duration-300 opacity-50 hover:opacity-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-3 h-3 md:w-4 md:h-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Banner Image */}
      <div className="absolute inset-0 transition-all duration-700 ease-in-out">
        <img
          src={images[currentImage]}
          alt={`Banner Image ${currentImage + 1}`}
          className="h-full object-cover w-full transition-transform duration-700 ease-in-out transform max-w-full"
        />
      </div>

      {/* Next Button */}
      <button
        onClick={goToNextImage}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-gradient-to-r from-violet-600 to-violet-400 p-1  rounded-full shadow-md hover:scale-105 transition-transform duration-300 opacity-50 hover:opacity-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-3 h-3 md:w-4 md:h-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot Navigation */}
      <div className="absolute bottom-4 flex space-x-3 md:space-x-4">
        {images.map((_, index) => (
          <span
            key={index}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full cursor-pointer transition duration-300 ease-in-out
              ${currentImage === index ? 'bg-violet-500 opacity-100' : 'bg-white opacity-40 hover:opacity-100'}
            `}
            onClick={() => setCurrentImage(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;