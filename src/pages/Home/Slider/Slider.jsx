import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import "../../../assets/css/swipper.css";

export default function Slider() {
  return (
    <section>
      <div className="container">
        <Swiper
          spaceBetween={40}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
          style={{ width: "100%", height: "460px",marginTop: "50px", boxSizing: "border-box", border: "2px solid rgba(0, 0, 0, 0.05)", borderRadius: "6px" }}
        >
          <SwiperSlide>
            <img
              className="slider__img"
              src="https://avatars.dzeninfra.ru/get-zen_doc/3491078/pub_600ea01d27add74df6cf8f96_600ea0438dfe7b3b2dafd1f5/scale_1200"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="slider__img"
              src="https://sun9-63.userapi.com/impg/pWYCLamV3VO2pt4nzGxrCV6AH5snrI3X2f7YUQ/HW54fACcXzM.jpg?size=1280x720&quality=95&sign=62d5a60c2512b15df8fb52012cf1826d&c_uniq_tag=8mqqoQYEPKtmG2OIN5VvVUoGuusKQkPs9RJwR6eXvmg&type=album"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="slider__img"
              src="https://armylife.ru/upload/iblock/79a/sale1.png"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="slider__img"
              src="https://energoteh-shop.ru/diskount.jpg"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="slider__img"
              src="https://thumbs.dreamstime.com/b/иллюстрация-вектора-от-баннера-современная-красная-метка-векторная-236428155.jpg"
              alt=""
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}
