import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/config";
import { IApplyCleanerForm } from "../interfaces";

export const applyCleaner = async (cleaner: IApplyCleanerForm) => {
  const ref = doc(firestore, `users/${cleaner.uid}`);
  try {
    await updateDoc(ref, cleaner);
  } catch (e) {
    throw new Error(e);
  }
};
