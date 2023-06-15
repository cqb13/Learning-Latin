const addParentName = (data: any, parentName: string): any => {
  if (Array.isArray(data)) {
    return data.map((item) => addParentName(item, parentName));
  }

  if (typeof data === "object" && data !== null) {
    const newData: { [key: string]: any } = {};

    for (const key in data) {
      let isChapter = key.includes("CHAPTER");

      if (key !== "INTRODUCTION" && !isChapter) {
        newData[key] = addParentName(data[key], key);
      } else {
        newData[key] = data[key];
      }
    }

    newData["name"] = parentName;
    return newData;
  }

  return data;
};

export default addParentName;
