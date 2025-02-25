const changeTextAccuracyState = (
  event: React.ChangeEvent<HTMLInputElement>,
  right: boolean
) => {
  if (right) {
    event.target.classList.remove("border-red-500", "border-neutral-300");
    event.target.classList.add("border-green-500");
  } else {
    event.target.classList.remove("border-green-500", "border-neutral-300");
    event.target.classList.add("border-red-500");
  }
};

export default changeTextAccuracyState;
