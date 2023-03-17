type textProps = {
  placeholder: string | string[];
  value?: any;
  id?: string | string[];
  class?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default textProps;