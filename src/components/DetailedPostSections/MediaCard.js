import React from "react";
import Swiper from "react-id-swiper";
import "swiper/css/swiper.css";
import "./MediaCard.css";

export default function MediaCard({ files }) {
  const params = {
    slidesPerView: 1,
    spaceBetween: 0,
    slidesPerGroup: 1,
    loopFillGroupWithBlank: true,
    navigation: {
      nextEl: ".swiper-button-next.custom1",
      prevEl: ".swiper-button-prev.custom1",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    containerClass: "customized-swiper-container",
  };

  const singleImageParams = {
    noSwiping: true,
    containerClass: "customized-swiper-container",
  };

  return files.length > 1 ? (
    <Swiper {...params}>
      {files.map((file, index) => (
        <img key={index} src={file} className="image" alt="alt" />
      ))}
    </Swiper>
  ) : (
    <Swiper {...singleImageParams}>
      {files.map((file, index) => (
        <img key={index} src={file} className="image" alt="alt" />
      ))}
    </Swiper>
  );
}
