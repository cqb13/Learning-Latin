import ButtonProps from '../../lib/types/buttonProps'
import style from './button.module.css'

const Button = (props: ButtonProps) => {
  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    props.onClick?.(event);
  };

  return (
    <a
      onClick={handleClick}
      className={`${style.button} ${props.class}`}
      type={props.type}
      target={props.target}
      href={props.href}
    >
      {props.children}
    </a>
  );
};

export default Button;
