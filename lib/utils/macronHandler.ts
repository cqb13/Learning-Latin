const macronHandler = (str: string) => {
  return str
    .replace(/ā|Ā/g, "a")
    .replace(/ē|Ē/g, "e")
    .replace(/ī|Ī/g, "i")
    .replace(/ō|Ō/g, "o")
    .replace(/ū|Ū/g, "u");
};

export default macronHandler;
