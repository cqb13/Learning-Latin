const chartClearable = (chart: string[][]) => {
  for (let i = 0; i < chart.length; i++) {
    for (let j = 0; j < chart[i].length; j++) {
      if (chart[i][j] !== "") {
        return true;
      }
    }
  }

  return false;
};

export default chartClearable;
