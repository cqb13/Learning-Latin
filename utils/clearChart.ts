const clearChart = (chart: string[][]) => {
  const inputs = document.querySelectorAll("input");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].classList.remove("border-red-500", "border-green-500");
    inputs[i].classList.add("border-neutral-300");
  }

  let emptyChart = chart;
  for (let i = 0; i < chart.length; i++) {
    for (let j = 0; j < chart[i].length; j++) {
      emptyChart[i][j] = "";
    }
  }

  return emptyChart;
};

export default clearChart;
