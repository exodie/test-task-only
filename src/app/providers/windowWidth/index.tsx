import { useEffect, useState } from "react";

import { WindowWidthContext } from "~/app";

export const WindowWidthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  const handleSubscribe = () => {
    setWindowWidth(window.innerWidth);
  };

  const onSubscribe = () => {
    window.addEventListener("resize", handleSubscribe);
  };

  const offSubscribe = () =>
    window.removeEventListener("resize", handleSubscribe);

  useEffect(() => {
    onSubscribe();

    return () => offSubscribe();
  }, []);

  return (
    <WindowWidthContext.Provider value={windowWidth}>
      {children}
    </WindowWidthContext.Provider>
  );
};
