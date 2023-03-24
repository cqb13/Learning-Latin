import buttonProps from '../../lib/types/buttonProps';
import style from './button.module.css'
import Link from 'next/link'

const Button = (props: buttonProps) => {
  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (props.locked) return;
    props.onClick?.(event);
  };

  if (props.link) {
    return (
      <>
        <Link onClick={handleClick} className={`${style.button} ${props.class}`} href={props.link.toString()} id={props.id}>
          {props.children}
        </Link> 
      </>
    );
  } 

  return (
    <a
      onClick={handleClick}
      className={`${props.locked? style.locked : ''} ${style.button} ${props.class}`}
      target={props.target}
      href={props.href}
      id={props.id}
    >
      {props.children}
    </a>
  );
};

export default Button;
