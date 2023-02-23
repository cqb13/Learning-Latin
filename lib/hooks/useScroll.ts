import { useCallback, useEffect, useState } from "react";

const useScroll = (type: "scrollOffSet" | "scrolling", threshold: number) => {
  const [scrolled, setScrolled] = useState(false);

  // checks if the user is scrolling or if the page is scrolled past a certain threshold
  const onScroll = useCallback(() => {
    if (type == "scrolling") {
      setScrolled(true);
      setTimeout(() => setScrolled(false), threshold);
    } else {
      setScrolled(window.pageYOffset > threshold);
    }
  }, [threshold]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return scrolled;
}

export default useScroll;
