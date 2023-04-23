import { Url } from "url";

interface buttonProps {
  class?: string;
  id?: string;
  locked?: boolean;
  href?: string;
  link?: Url | string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  children?: React.ReactNode;
};

export default buttonProps;
