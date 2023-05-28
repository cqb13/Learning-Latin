import buttonProps from '@prop-types/buttonProps';
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
        <Link 
          onClick={handleClick} 
          className={`${props.locked? "bg-gray-700 cursor-default" : "bg-primary-color hover:bg-primary-color-dark active:tracking-widest"} child:pointer-events-none flex flex-row justify-center items-center text-center border-none text-white px-8 py-[calc(15px)] rounded transition-all cursor-pointer select-none ${props.class}`}
          href={props.link.toString()} id={props.id}>
          {props.children}
        </Link> 
      </>
    );
  } 

  return (
    <a
      onClick={handleClick}
      className={`${props.locked? "bg-gray-700 cursor-default" : "bg-primary-color hover:bg-primary-color-dark active:tracking-widest"} child:pointer-events-none flex flex-row justify-center items-center text-center border-none text-white px-8 py-[calc(15px)] rounded transition-all cursor-pointer select-none ${props.class}`}
      target={props.target}
      href={props.href}
      id={props.id}
    >
      {props.children}
    </a>
  );
};

export default Button;
