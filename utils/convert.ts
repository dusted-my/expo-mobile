export const convertStringToFloat = (value: string, fractionDigits = 2) => {
  return parseFloat(parseFloat(value).toFixed(fractionDigits));
};
