export const formToObj = (form) => {
  console.log(form);
  const formData = new FormData(form);
  const formObj = {};
  formData.forEach((value, key) => {
    formObj[key] = value;
  });
  console.log(formObj);
  return formObj;
};