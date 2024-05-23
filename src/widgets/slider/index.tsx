import { FC, memo, useEffect, useLayoutEffect, useRef, useState } from "react";

import { Article } from "../../shared/types";

import styles from "./styles.module.scss";

import gsap from "gsap";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css";

import { useWindowWidth, useCurrentIdx, useArticles } from "~/app";

export const Slider: FC = memo(() => {
  const swiperRef = useRef<SwiperCore>();
  const wrapperRef = useRef(null);

  const windowWidth = useWindowWidth();
  const { currentIndex } = useCurrentIdx();
  const articlesData = useArticles();

  const [settings, setSettings] = useState<SwiperProps>({
    slidesPerView: 3,
    spaceBetween: 80,
    speed: 300,
  });

  const [data, setData] = useState<Article | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    if (windowWidth > 1024) {
      setSettings((prevState) => ({
        ...prevState,
        slidesPerView: 3,
        spaceBetween: 80,
      }));
    } else if (768 < windowWidth && windowWidth <= 1024) {
      setSettings((prevState) => ({
        ...prevState,
        slidesPerView: 2,
        spaceBetween: 40,
      }));
    } else if (425 < windowWidth && windowWidth <= 768) {
      setSettings((prevState) => ({
        ...prevState,
        slidesPerView: 2,
        spaceBetween: 25,
      }));
    } else if (windowWidth <= 425) {
      setSettings((prevState) => ({
        ...prevState,
        slidesPerView: 1.5,
        spaceBetween: 25,
      }));
    }
  }, [windowWidth]);

  useEffect(() => {
    if (!data) {
      setData({
        topic: articlesData[currentIndex].topic,
        data: articlesData[currentIndex].data,
      });
    }

    const timer = setTimeout(() => {
      setSettings((prevState) => ({
        ...prevState,
        speed: 0,
      }));

      setData({
        topic: articlesData[currentIndex].topic,
        data: articlesData[currentIndex].data,
      });
    }, 400);

    return () => {
      clearTimeout(timer);
      gsap.to(wrapperRef!.current, {
        duration: 0.2,
        opacity: 0,
      });
    };
  }, [articlesData, currentIndex]);

  useLayoutEffect(() => {
    swiperRef.current?.slideTo(0);
    setSettings((prevState) => ({
      ...prevState,
      speed: 300,
    }));
    gsap.fromTo(
      wrapperRef.current,
      {
        y: 5,
      },
      {
        duration: 0.4,
        opacity: 1,
        y: 0,
      }
    );
  }, [data]);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      {windowWidth <= 768 && <div className={styles.title}>{data?.topic}</div>}
      <div className={styles.slider}>
        {windowWidth > 768 && (
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className={styles.prev}
            disabled={activeIndex === 0}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="12"
              viewBox="0 0 8 12"
              fill="none"
            >
              <path d="M1 1L6 6L1 11" stroke="#3877EE" strokeWidth="2" />
            </svg>
          </button>
        )}
        <Swiper
          {...settings}
          className={styles.swiper}
          allowTouchMove={true}
          grabCursor={true}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.activeIndex);
          }}
        >
          {data &&
            data.data.map((item, index) => (
              <SwiperSlide
                key={item.date}
                style={
                  windowWidth <= 425
                    ? {
                        opacity:
                          swiperRef.current?.activeIndex === index ? 1 : 0.4,
                      }
                    : {}
                }
              >
                <div className={styles.slide}>
                  <p className={styles.date}>{item.date}</p>
                  <p className={styles.text}>{item.text}</p>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
        {windowWidth > 768 && (
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className={styles.next}
            disabled={
              !!(
                data &&
                typeof settings.slidesPerView === "number" &&
                activeIndex === data.data?.length - settings.slidesPerView
              )
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="12"
              viewBox="0 0 8 12"
              fill="none"
            >
              <path d="M1 1L6 6L1 11" stroke="#3877EE" strokeWidth="2" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
});
