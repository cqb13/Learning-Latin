import textProps from "@prop-types/textProps";
import { useState, useEffect } from "react";

const Text = (props: textProps) => {
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
    if (props.value) return;
    setValue(event.target.value);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === props.keyName) {
      props.onKeyPress?.(event);
    }
  };

  return (
    <input
      type='text'
      placeholder={placeholder}
      className={`max-sm:text-center text-xl p-2 border border-neutral-300 rounded focus:outline-none focus:ring-0 focus:border-primary-color-dark placeholder:text-primary-color ${props.class}`}
      onChange={onChange}
      onKeyDown={onKeyDown}
      value={value}
      id={id}
    />
  );
};

export default Text;
