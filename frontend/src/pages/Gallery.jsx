import React from 'react';

function Gallery() {
  return (
    <div className="container">
      <h1>Our Henna Designs</h1>
      <div className="gallery">
        <img src="/images/design1.jpg" alt="Design 1" />
        <img src="/images/design2.jpg" alt="Design 2" />
        <img src="/images/design3.jpg" alt="Design 3" />
        <img src="/images/design4.jpg" alt="Design 4" />
        {/* Add more images as needed */}
      </div>
    </div>
  );
}

export default Gallery;
