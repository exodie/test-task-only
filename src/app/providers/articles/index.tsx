import { useEffect, useState } from "react";

import { ArticlesContext } from "~/app";

import { SHARED_DATA } from "~/shared/data";
import { Article } from "~/shared/types";

export const ArticlesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [articlesData, setArticlesData] = useState<Article[]>([]);

  useEffect(() => {
    setArticlesData(SHARED_DATA);
  }, []);

  return (
    <ArticlesContext.Provider value={articlesData}>
      {children}
    </ArticlesContext.Provider>
  );
};
