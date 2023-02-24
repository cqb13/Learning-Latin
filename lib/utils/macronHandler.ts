const macronHandler = (str: string) => {
  return str
    .replace(/ā/g, "a")
    .replace(/ē/g, "e")
    .replace(/ī/g, "i")
    .replace(/ō/g, "o")
    .replace(/ū/g, "u");
};

export default macronHandler;
