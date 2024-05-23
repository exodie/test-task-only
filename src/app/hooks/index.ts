import { useContext } from "react";
import {
  WindowWidthContext,
  ArticlesContext,
  CurrentIndexContext,
} from "~/app";

export const useWindowWidth = () => useContext(WindowWidthContext);
export const useArticles = () => useContext(ArticlesContext);
export const useCurrentIdx = () => useContext(CurrentIndexContext);
