import React from 'react';
import bannerJpg from '../banner.png';
import '../index.css';

function Banner() {
  return (
    <img
    className="banner-jpg"
    src={bannerJpg}
    alt="Banner"
    />
  );
}

export default Banner;
