import { Url } from "url";

type ButtonProps = {
  class?: string;
  href?: string;
  link?: Url | string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  id?: string;
  onClick?: (event: any) => void;
  children?: any;
};

export default ButtonProps;
