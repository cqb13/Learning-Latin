import TextProps from "../../lib/types/TextProps";
import { useState, useEffect } from "react";
import styles from "./text.module.css";

const Text = (props: TextProps) => {
  const [defaultValue, setDefaultValue] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [value, setValue] = useState("");
  const [id, setId] = useState("");

  //handles arrays as inputs
  useEffect(() => {
    if (props.id) {
      if (Array.isArray(props.id)) {
        setId(props.id.join(","));
      } else {
        setId(props.id);
      }
    } else {
      setId("");
    }

    if (props.placeholder) {
      if (Array.isArray(props.placeholder)) {
        setPlaceholder(props.placeholder.join(", "));
      } else {
        setPlaceholder(props.placeholder);
      }
    } else {
      setPlaceholder("");
    }

    if (props.value) {
      if (Array.isArray(props.value)) {
        setValue(props.value.join(", "));
      } else {
        setValue(props.value);
      }
    } else {
      setValue("");
    }
  }, [props.id, props.placeholder, props.value]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange?.(event);
    setDefaultValue(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder={placeholder}
      className={`${styles.input} ${props.class}`}
      onChange={onChange}
      value={props.value? value : defaultValue}
      id={id}
    />
  );
};

export default Text;
