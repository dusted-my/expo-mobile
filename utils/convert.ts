import { Timestamp } from "firebase/firestore";

export const convertStringToFloat = (value: string, fractionDigits = 2) => {
  return parseFloat(parseFloat(value).toFixed(fractionDigits));
};

export const convertDateToTs = (date: Date) => {
  return new Timestamp(parseInt((date.valueOf() / 1000).toFixed(2)), 0);
};
