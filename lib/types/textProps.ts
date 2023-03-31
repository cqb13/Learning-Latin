type textProps = {
  placeholder: string | string[];
  value?: any;
  id?: string | string[];
  class?: string;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  keyName?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default textProps;
