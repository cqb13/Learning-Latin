import chartProps from "../types/chartProps";

const createValueArrayMap = (data: chartProps, chartIndex: number) => {
  let arrayMap = [] as any;
  for (let i = 0; i < data.chart[chartIndex].rows.length; i++) {
    arrayMap.push([]);
    for (let j = 0; j < data.chart[chartIndex].rows[i].rowContent.length; j++) {
      arrayMap[i].push("");
    }
  }
  return arrayMap;
};

export default createValueArrayMap;
