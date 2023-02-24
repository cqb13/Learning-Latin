import ButtonProps from '../../lib/types/buttonProps'
import style from './button.module.css'
import Link from 'next/link'

const Button = (props: ButtonProps) => {
  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    props.onClick?.(event);
  };

  if (props.link) {
    return (
      <>
        <Link onClick={handleClick} className={`${style.button} ${props.class}`} href={props.link.toString()}>
          {props.children}
        </Link> 
      </>
    );
  } 

  return (
    <a
      onClick={handleClick}
      className={`${style.button} ${props.class}`}
      target={props.target}
      href={props.href}
    >
      {props.children}
    </a>
  );
};

export default Button;
