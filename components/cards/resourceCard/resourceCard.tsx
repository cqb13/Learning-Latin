import resourceProps from "../../../lib/types/resourceProps";
import Button from "../../button/button";
import styles from "../cards.module.css";

const ResourceCard = (props: resourceProps) => {
  return (
    <section className={styles.card}>
      <h2>
        {props.name}
      </h2>
      <p>
        {props.description}
      </p>
      <Button href={props.url} target="_blank" class={styles.buttonBottom}>
        Visit
      </Button>
    </section>
  );
};

export default ResourceCard;
