type textProps = {
  class?: string;
  id?: string | string[];
  value?: any;
  placeholder: string | string[];
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  keyName?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default textProps;
