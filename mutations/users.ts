import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/config";
import { IApplyCleanerForm, IEditCustomerForm } from "../interfaces";
import { convertStringToFloat } from "../utils";

export const applyCleaner = async (form: IApplyCleanerForm) => {
  const data = {
    ...form,
    hourlyRate: convertStringToFloat(form.hourlyRate, 2),
    status: "pending_cleaner",
  };
  const ref = doc(firestore, `users/${form.uid}`);
  try {
    await updateDoc(ref, data);
  } catch (e) {
    throw new Error(e);
  }
};

export const editCustomer = async (form: IEditCustomerForm) => {
  const data = {
    ...form,
    hourlyRate: convertStringToFloat(form.hourlyRate, 2),
  };
  const ref = doc(firestore, `users/${form.uid}`);
  try {
    await updateDoc(ref, data);
  } catch (e) {
    throw new Error(e);
  }
};
