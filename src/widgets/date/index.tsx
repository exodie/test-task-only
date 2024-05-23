import { type FC, useEffect, useRef, useState } from "react";

import styles from "./styles.module.scss";

import { gsap } from "gsap";

import { useArticles, useCurrentIdx } from "~/app";

export const Date: FC = () => {
  const articles = useArticles();
  const { currentIndex } = useCurrentIdx();

  const [date, setDate] = useState({
    left: 0,
    right: 0,
  });

  const left = useRef(null);
  const right = useRef(null);

  useEffect(() => {
    if (articles.length <= 0) return;
    const articlesDataIndex = articles[currentIndex].data;

    setDate({
      ...date,
      left: articlesDataIndex[0].date,
      right: articlesDataIndex[articlesDataIndex.length - 1].date,
    });
  }, [articles, currentIndex]);

  useEffect(() => {
    if (!date.left || !date.right) return;
    gsap.from(left.current, {
      innerText: date.left,
      snap: {
        innerText: 1,
      },
    });

    gsap.from(right.current, {
      innerText: date.right,
      snap: {
        innerText: 1,
      },
    });
  }, []);

  return (
    <div className={styles.wrapper}>
      <span className={styles.left} ref={left}>
        {date.left}
      </span>
      <span className={styles.right} ref={right}>
        {date.right}
      </span>
    </div>
  );
};
