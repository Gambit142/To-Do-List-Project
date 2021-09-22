// eslint-disable-next-line import/prefer-default-export
export const interaction = (e) => {
  if (e.target.checked) {
    e.target.value = true;
    console.log(e.target.value);
  } else {
    e.target.value = false;
    console.log(e.target.value);
  }
};