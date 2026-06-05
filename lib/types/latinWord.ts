export type LatinWord = {
  orth: string;
  parts: string[];
  senses: string[];
  pos: string;
  id: number;
};

export type WordList = {
  word: string;
  info: LatinWord;
};
