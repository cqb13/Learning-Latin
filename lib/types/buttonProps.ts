type ButtonProps = {
  type?: string;
  href?: string;
  class?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  onClick?: (event: any) => void;
  children?: any;
};

export default ButtonProps;
