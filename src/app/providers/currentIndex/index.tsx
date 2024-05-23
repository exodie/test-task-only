import { useState } from "react";

import { CurrentIndexContext } from "~/app";

export const CurrentIndexProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <CurrentIndexContext.Provider value={{ currentIndex, setCurrentIndex }}>
      {children}
    </CurrentIndexContext.Provider>
  );
};
