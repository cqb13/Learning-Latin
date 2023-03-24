const chartClearable = () => {
  const inputs = document.querySelectorAll("input");
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value !== "") {
      return true;
    }
  }
  return false;
};

export default chartClearable;
