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

  data();

  return (
    <section className={styles.translationCard} key={props.data.word}>
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
        {props.data.defs.length > 0 ? (
          <>
            {props.data.defs.map((def: any) => {
              return (
                <div className={styles.shadowCard}>
                  <div className={styles.translationCardOrthList}>
                  {def.orth.map((orth: string) => {
                    return (
                      <p>
                        {orth}
                      </p>
                    )
                  })}
                  </div>
                  <div className={styles.translationCardDefinitionContainer}>
                  {def.senses.map((sense: string) => {
                    return (
                      <p className={styles.translationCardHighlight}>
                        {sense}
                      </p>
                    )
                  })}
                  </div>
                </div>
              );
            })
            }
          </>
        ) : (
          <>
            <p>Sorry, your word was not found</p>
            <p>Please double check spelling, confirm words existence</p>
            <p>You believe that program should have found you word, please open in issue in our github repo</p>
            <a href="https://github.com/Templar-Development/Open-Words-TS/issues/new/choose">Open Words TS</a>
          </>
        )}
      </section>
    </section>
  );
};

export default TranslationCard;
