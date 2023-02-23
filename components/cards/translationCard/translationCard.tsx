import styles from "../cards.module.css";
import Button from "../../button/button";
import { useState } from "react";

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
          <Button onClick={changeVisibility}>
            {switchVisibilitySign}
          </Button>
          <Button onClick={deleteCard}>X</Button>
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
