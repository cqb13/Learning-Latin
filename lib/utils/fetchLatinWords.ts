import type { LatinWord } from "@prop-types/latinWord";
import defaultWordList from "@data/defaultWordList";

const BASE_URL = "https://translator.learninglatin.net";

const fetchLatinWords = async (
  amount: number,
  posList: string,
): Promise<LatinWord[]> => {
  try {
    const url = `${BASE_URL}/get_list?type_of_words=latin&pos_list=${posList}&amount=${amount}&random=true`;
    const response = await fetch(url);
    const result = await response.json();

    if (result.error) {
      console.error(result.error);
      return defaultWordList;
    }

    return result.map((word: any) => ({
      orth: word.orth,
      parts: word.parts,
      senses: word.senses,
      pos: word.pos,
      id: word.id,
    }));
  } catch (error) {
    console.error(error);
    return defaultWordList;
  }
};

export default fetchLatinWords;
