import macronList from "@data/macronList";

const checkForMacrons = (str: string) => {
  for (let i = 0; i < str.length; i++) {
    if (macronList.includes(str[i])) {
      return true;
    }
  }
  return false;
};

export default checkForMacrons;
