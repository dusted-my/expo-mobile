import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../firebase/config";
import { IContract } from "../interfaces";

export const createContract = async (contract: IContract) => {
  const ref = collection(firestore, "contracts");
  try {
    await addDoc(ref, contract);
  } catch (e) {
    throw new Error(e);
  }
};
