const arrowHandler = (str: string) => {
  return str
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<");
};

export default arrowHandler;
