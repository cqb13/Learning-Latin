export const macronList = ["ā", "ē", "ī", "ō", "ū"];

export const checkForMacrons = (str: string) => {
  for (let i = 0; i < str.length; i++) {
    if (macronList.includes(str[i])) {
      return true;
    }
  }
  return false;
};

const macronHandler = (str: string) => {
  return str
    .replace(/ā/g, "a")
    .replace(/ē/g, "e")
    .replace(/ī/g, "i")
    .replace(/ō/g, "o")
    .replace(/ū/g, "u");
};

export default macronHandler;
