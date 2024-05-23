import { type FC, useEffect, useLayoutEffect, useRef, useState } from "react";

import styles from "./styles.module.scss";

import { gsap } from "gsap";

import Dot from "../dot";

import { useArticles, useCurrentIdx } from "~/app";

export const Circle: FC = () => {
  const [coordinates, setCoordinates] = useState<number[][]>([]);
  const [rotationFullDeg, setRotationFullDeg] = useState<number>(0);

  const articles = useArticles();
  const { currentIndex } = useCurrentIdx();

  const circle = useRef<HTMLDivElement>(null);

  const numberOfArticle = articles.length;

  useEffect(() => {
    if (circle.current && articles.length > 0 && circle.current.offsetWidth) {
      const radius = circle.current.offsetWidth / 2;

      const arr: number[][] = [];
      for (let i = Math.PI * 2; i > 0; i -= (Math.PI * 2) / numberOfArticle) {
        const formula = i - Math.PI / 0.857;

        arr.push([
          radius + radius * Math.sin(formula),
          radius + radius * Math.cos(formula),
        ]);
      }
      setCoordinates(arr);
    }
  }, [articles, circle]);

  useEffect(() => {
    if (numberOfArticle > 0) {
      setRotationFullDeg((360 / numberOfArticle) * currentIndex);
    }
  }, [currentIndex, numberOfArticle]);

  useLayoutEffect(() => {
    if (circle.current) {
      gsap.to(circle.current, {
        rotation: -rotationFullDeg,
      });
    }
  }, [rotationFullDeg]);

  return (
    <div className={styles.circle} ref={circle}>
      {coordinates.length !== 0 &&
        articles.map((item, index) => (
          <Dot
            key={item.topic}
            item={item}
            index={index}
            coordinates={coordinates[index]}
            rotationDeg={rotationFullDeg}
          />
        ))}
    </div>
  );
};
