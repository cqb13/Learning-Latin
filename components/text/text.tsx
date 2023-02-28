import { useState, useEffect } from "react";
import styles from "./text.module.css";
 
type TextProps = {
    placeholder: string;
    class?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; 
    id?: string | string[];
}

const Text = (props: TextProps) => {
    const [id, setId] = useState({} as string);
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange?.(event);
    };

    //some of the data sets have multiple answers for 1 question, and answers r stored in the ids, but ids cant be array
    useEffect(() => {
        if (props.id) {
            if (Array.isArray(props.id)) {
                let stringForm = props.id.join(",");
                console.log(stringForm);
                setId(stringForm);
            } else {   
                setId(props.id);
            }
        }
    });

    return (
        <>
            <input type="text" placeholder={props.placeholder} className={`${styles.input} ${props.class}`} onChange={onChange} id={id}/>
        </>
    );
}

export default Text;