import { createContext } from "react";

import { Article } from "~/shared/types";

interface IndexContext {
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>> | null;
}

export const CurrentIndexContext = createContext<IndexContext>({
  currentIndex: 0,
  setCurrentIndex: null,
});
export const ArticlesContext = createContext<Article[]>([]);
export const WindowWidthContext = createContext<number>(window.innerWidth);
