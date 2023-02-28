import styles from "./text.module.css";

type TextProps = {
    placeholder: string;
    class?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; 
    id?: string | string[];
}

const Text = (props: TextProps) => {
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange?.(event);
    };

    return (
        <>
            <input type="text" placeholder={props.placeholder} className={`${styles.input} ${props.class}`} onChange={onChange} id={props.id}/>
        </>
    );
}

export default Text;