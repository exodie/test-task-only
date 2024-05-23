import styles from "./styles.module.scss";

import gsap from "gsap";

import { useArticles, useWindowWidth } from "~/app";

import { Title, Date, Circle, TopicsPagination, Slider } from "~/widgets";

export const App = () => {
  const windowWidth = useWindowWidth();
  const articles = useArticles();

  gsap.defaults({
    duration: 0.8,
  });

  return (
    <div className={styles.container}>
      {windowWidth > 768 && <div className={styles.centerStroke}></div>}
      <div className={styles.wrapper}>
        <Title />
        <Date />
        {windowWidth > 768 && <Circle />}
      </div>

      <div className={styles.sliderWrapper}>
        <TopicsPagination />

        {articles.length > 0 && <Slider />}
      </div>
    </div>
  );
};
