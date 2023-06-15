import { NextApiRequest, NextApiResponse } from "next";
import { Parser } from "./Open-Words-TS/src/parser";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { word, lang } = req.query;

  if (!word || Array.isArray(word)) {
    res.status(400).json({ error: "Please provide a valid word parameter" });
    return;
  }

  const words = word;
  const parser = new Parser();

  let result: any;
  if (lang === "latin-to-english") {
    result = parser.parseLine(words, "lte", true);
  } else if (lang === "english-to-latin") {
    result = parser.parseLine(words, "etl", true);
  } else {
    res.status(400).json({ error: "Please provide a valid type parameter" });
    return;
  }

  try {
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the data" });
  }
};
