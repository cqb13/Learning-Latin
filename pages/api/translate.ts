import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { word, lang } = req.query;

  if (!word || Array.isArray(word)) {
    res.status(400).json({ error: "Please provide a valid word parameter" });
    return;
  }

  const words = word.split(" ");
  const wordMap = new Map();

  let url: string;
  if (lang === "latin-to-english") {
    url = "http://www.archives.nd.edu/cgi-bin/wordz.pl?keyword=";
  } else if (lang === "english-to-latin") {
    url = "https://archives.nd.edu/cgi-bin/wordz.pl?english=";
  } else {
    res.status(400).json({ error: "Please provide a valid type parameter" });
    return;
  }

  try {
    const promises = words.map(async (word) => {
      const response = await fetch(url + word);
      let text = await response.text();
      text = text.replace("William Whitaker's Words", "");
      text = text.replace(word, "").trim();
      text = text.replace(/(<([^>]+)>)/gi, "");
      text = text.split("\n").slice(2).join("\n");
      text = text.split("\n").slice(0, -1).join("\n");
      wordMap.set(word, text);
    });

    await Promise.all(promises);

    const orderedMap = new Map();
    words.forEach((word) => {
      orderedMap.set(word, wordMap.get(word));
    });

    res.status(200).json(Object.fromEntries(orderedMap.entries()));
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the data" });
  }
};
