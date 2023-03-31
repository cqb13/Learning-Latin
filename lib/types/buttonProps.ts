import { Url } from "url";

type buttonProps = {
  class?: string;
  id?: string;
  locked?: boolean;
  href?: string;
  link?: Url | string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  onClick?: (event: any) => void;
  children?: any;
};

export default buttonProps;