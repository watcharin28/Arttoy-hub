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
    <div className="relative h-96 bg-yellow-100 flex items-center justify-center overflow-hidden">
 
      <button
        onClick={goToPrevImage}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full"
      >
        &lt;
      </button>


      <img
        src={images[currentImage]}
        alt={`Banner Image ${currentImage + 1}`}
        className="h-full object-cover w-full"
      />


      <button
        onClick={goToNextImage}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full"
      >
        &gt;
      </button>
    </div>
  );
};

export default Banner;
