import { useCallback, useEffect, useState } from "react";

const useScreenWidth = (width: number) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth < width);

  const onResize = useCallback(() => {
    setScreenWidth(window.innerWidth < width);
  }, [width]);

  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [onResize]);

  return screenWidth;
};

export default useScreenWidth;
