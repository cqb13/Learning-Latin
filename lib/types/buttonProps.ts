import { Url } from "url";

type buttonProps = {
  class?: string;
  href?: string;
  link?: Url | string;
  locked?: boolean;
  target?: "_blank" | "_self" | "_parent" | "_top";
  id?: string;
  onClick?: (event: any) => void;
  children?: any;
};

export default buttonProps;