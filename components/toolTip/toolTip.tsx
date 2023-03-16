import React, { useState } from "react";
import styles from "./toolTip.module.css";

//TODO: better types
const ToolTip = ({
  delay,
  direction,
  content,
  children
}: {
  delay?: number;
  direction: "top" | "right" | "left" | "bottom";
  content: any;
  children: any;
}) => {
  let timeout: any;
  const [directionClass] = useState(styles[direction]);
  const [active, setActive] = useState(false);

  const showTip = () => {
    console.log("showing tip")
    timeout = setTimeout(() => {
      setActive(true);
    }, delay || 400);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  //!!! direction class is undefined
  return (
    <div
      className={styles.toolTipWrapper}
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {children}
      {active &&
        <div className={`${styles.toolTip} ${directionClass}`}>
          {content}
        </div>}
    </div>
  );
};

export default ToolTip;
