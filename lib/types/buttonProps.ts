import { Url } from "url";

interface buttonProps {
  class?: string;
  id?: string;
  locked?: boolean;
  href?: string;
  link?: Url | string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  onClick?: (event: any) => void;
  children?: React.ReactNode;
};

export default buttonProps;
