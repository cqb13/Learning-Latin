import ToolTip from "../../toolTip/toolTip";
import styles from "../cards.module.css";
import Button from "../../button/button";
import { useState } from "react";
import Image from "next/image";

//TODO: Icons
const TranslationCard = (props: any) => {
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [switchVisibilitySign, setSwitchVisibilitySign] = useState<string>("-");

  const changeVisibility = () => {
    setIsMinimized(!isMinimized);
    setSwitchVisibilitySign(switchVisibilitySign === "-" ? "+" : "-");
  };

  const deleteCard = () => {
    props.removeCard();
  };

  return (
    <section className={styles.translationCard} key={props.word}>
      <section className={styles.visibilityOptions}>
        <h2 className={styles.cardTitle}>
          {props.word}
        </h2>
        <div className={styles.visibilityButtonContainer}>
          <ToolTip direction="bottom" content={isMinimized ? "expand card" : "shrink card"} delay={20}>
            <Button onClick={changeVisibility}>
              {isMinimized ?               
              <Image
                  src="/plus.svg"
                  alt="expand card"
                  width={20}
                  height={20}
                /> :               
              <Image
                src="/minus.svg"
                alt="shrink card"
                width={20}
                height={20}
              />}
            </Button>
          </ToolTip>
          <ToolTip direction="bottom" content={"remove card"} delay={20}>
            <Button onClick={deleteCard}>
              <Image
                src="/clear.svg"
                alt="remove card"
                width={20}
                height={20}
              />
            </Button>
          </ToolTip>
        </div>
      </section>
      <section className={isMinimized ? "hidden" : ""}>
        <pre>
          {props.translation}
        </pre>
      </section>
    </section>
  );
};

export default TranslationCard;
