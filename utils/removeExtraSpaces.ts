const removeExtraSpaces = (str: string) => {
  return str.replace(/\s+/g, " ").trim();
};

export default removeExtraSpaces;
