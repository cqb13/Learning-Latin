import ToolTip from "../../toolTip/toolTip";
import styles from "../cards.module.css";
import Button from "../../button/button";
import { useState } from "react";
import Image from "next/image";

const TranslationCard = (props: any) => {
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  const changeVisibility = () => {
    setIsMinimized(!isMinimized);
  };

  const deleteCard = () => {
    props.removeCard();
  };

  const data = () => {
    console.log(props.data);
  };

  //data();

  return (
    <section className={styles.translationCard} key={props.word}>
      <section className={styles.visibilityOptions}>
        <h2 className={styles.cardTitle}>
          {props.data.word}
        </h2>
        <div className={styles.visibilityButtonContainer}>
          <ToolTip
            direction="bottom"
            content={isMinimized ? "expand card" : "shrink card"}
            delay={20}
          >
            <Button onClick={changeVisibility}>
              {isMinimized
                ? <Image
                    src="/plus.svg"
                    alt="expand card"
                    width={20}
                    height={20}
                  />
                : <Image
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
        <section className={styles.translationCardOrthList}>
          {props.data.defs[0].orth.map((o: string) => (
            <p className={styles.translationCardHighlight}>
              {o}
            </p>
          ))}
        </section>
        <section className={styles.translationCardDefinitionContainer}>
          <h3>Definitions:</h3>
          <div>
            {props.data.defs[0].senses.map((s: string) => (
              <p className={styles.translationCardHighlight}>
                {s}
              </p>
            ))}
          </div>
        </section>
      </section>
    </section>
  );
};

export default TranslationCard;
