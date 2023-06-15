const reorganizeData = (data: any, order: string[]): any => {
  if (Array.isArray(data)) {
    if (data.length === 1) {
      return reorganizeData(data[0], order);
    }
    return data.map((item) => reorganizeData(item, order));
  }

  if (typeof data === "object" && data !== null) {
    const reorganizedData: { [key: string]: any } = {};

    if ("INTRODUCTION" in data) {
      reorganizedData["INTRODUCTION"] = data["INTRODUCTION"][0];
      delete data["INTRODUCTION"];
    }

    order.forEach((key) => {
      if (key in data) {
        reorganizedData[key] = reorganizeData(data[key], order);
        delete data[key];
      }
    });

    for (const key in data) {
      reorganizedData[key] = reorganizeData(data[key], order);
    }

    return reorganizedData;
  }

  return data;
};

export default reorganizeData;
