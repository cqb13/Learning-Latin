import chartStyles from "../../components/chart/chart.module.css";

const changeTextAccuracyState = (
  event: React.ChangeEvent<HTMLInputElement>,
  right: boolean
) => {
  if (right) {
    event.target.classList.remove(chartStyles.wrong);
    event.target.classList.add(chartStyles.right);
  } else {
    event.target.classList.remove(chartStyles.right);
    event.target.classList.add(chartStyles.wrong);
  }
};

export default changeTextAccuracyState;
