"use client";

import { useState } from "react";

const ToolTip = ({
  delay,
  content,
  children,
}: {
  delay?: number;
  content: any;
  children: any;
}) => {
  let timeout: any;
  const [active, setActive] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, delay || 400);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <div
      className="inline-block relative"
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {children}
      {active && (
        <div
          className={`mt-1 absolute text-xs border-solid border-transparent rounded left-1/2 -translate-x-1/2 p-1 text-gray-200 bg-black font-sans leading-tight z-50 whitespace-nowrap`}
          style={{
            top: "100%",
            transformOrigin: "top",
            borderWidth: "0 2px 2px",
            transform: "translateX(-50%)",
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default ToolTip;
