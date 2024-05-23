import { type FC } from "react";

import styles from "./styles.module.scss";

import { useArticles, useCurrentIdx, useWindowWidth } from "~/app";

export const TopicsPagination: FC = () => {
  const windowWidth = useWindowWidth();
  const { currentIndex, setCurrentIndex } = useCurrentIdx();
  const articlesData = useArticles();

  const prevClick = () => {
    setCurrentIndex && setCurrentIndex((prevState) => prevState - 1);
  };

  const nextClick = () => {
    setCurrentIndex && setCurrentIndex((prevState) => prevState + 1);
  };

  return (
    <div className={styles.wrapper}>
      <span className={styles.currentPage}>
        0{currentIndex + 1}/0{articlesData.length}
      </span>

      <div className={styles.buttons}>
        <button
          className={styles.leftButton}
          onClick={prevClick}
          disabled={currentIndex === 0}
        >
          {windowWidth > 768 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 50 50"
              fill="none"
            >
              <circle
                cx="25"
                cy="25"
                r="24.5"
                transform="matrix(-1 0 0 1 50 0)"
                stroke="#42567A"
                strokeOpacity="0.5"
              />
              <path
                d="M27.4999 18.75L21.2499 25L27.4999 31.25"
                stroke="#42567A"
                strokeWidth="2"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="26"
              viewBox="0 0 25 26"
              fill="none"
            >
              <circle
                cx="12.5"
                cy="12.5"
                r="12"
                transform="matrix(-1 0 0 1 25 0.666718)"
                stroke="#42567A"
                strokeOpacity="0.5"
              />
              <path
                d="M13.7489 10.0418L10.6239 13.1668L13.7489 16.2918"
                stroke="#42567A"
                strokeWidth="2"
              />
            </svg>
          )}
        </button>
        <button
          className={styles.rightButton}
          onClick={nextClick}
          disabled={currentIndex === articlesData.length - 1}
        >
          {windowWidth > 768 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 50 50"
              fill="none"
            >
              <circle
                cx="25"
                cy="25"
                r="24.5"
                stroke="#42567A"
                strokeOpacity="0.5"
              />
              <path
                d="M22.5001 18.75L28.7501 25L22.5001 31.25"
                stroke="#42567A"
                strokeWidth="2"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
            >
              <circle
                cx="12.8326"
                cy="13.1667"
                r="12"
                stroke="#42567A"
                strokeOpacity="0.5"
              />
              <path
                d="M11.5839 10.0418L14.7089 13.1668L11.5839 16.2918"
                stroke="#42567A"
                strokeWidth="2"
              />
            </svg>
          )}
        </button>
      </div>
      {windowWidth <= 768 && (
        <div className={styles.pagination}>
          {articlesData.map((_, index) => (
            <button
              key={index}
              className={styles.dotWrapper}
              style={{ opacity: index != currentIndex ? 0.4 : 1 }}
              onClick={() => setCurrentIndex && setCurrentIndex(index)}
            >
              <div className={styles.dot}></div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
