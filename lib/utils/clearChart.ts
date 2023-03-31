import chartStyles from "../../components/chart/chart.module.css";

const clearChart = () => {
  const inputs = document.querySelectorAll("input");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].classList.remove(chartStyles.right);
    inputs[i].classList.remove(chartStyles.wrong);
    inputs[i].value = "";
  }
};

export default clearChart;
