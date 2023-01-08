import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { firestore, functions } from "../firebase/config";
import {
  IContract,
  ICreateContractForm,
  IPaymentIntentBody,
  IPaymentSheetParams,
} from "../interfaces";
import { convertDateToTs } from "../utils";

export const createContract = async (
  contract: ICreateContractForm
): Promise<IContract> => {
  const ref = collection(firestore, "contracts");
  try {
    const newDoc = await addDoc(ref, contract);
    return { ...contract, contractId: newDoc.id };
  } catch (e) {
    throw new Error(e);
  }
};

export const confirmContract = async (contractId: string) => {
  const ref = doc(firestore, `contracts/${contractId}`);
  const data: Partial<IContract> = {
    status: "client_submitted",
    updatedAt: convertDateToTs(new Date()),
  };
  try {
    await updateDoc(ref, data);
  } catch (e) {
    throw new Error(e);
  }
};

export const fetchPaymentSheetParams = async (
  body: IPaymentIntentBody
): Promise<IPaymentSheetParams> => {
  const createPaymentIntent = httpsCallable(functions, "createPaymentIntent");
  try {
    const res = await createPaymentIntent(body);
    return res.data as IPaymentSheetParams;
  } catch (e) {
    throw new Error(e);
  }
};

export const approveContract = async (
  contractId: string,
  approved: boolean
) => {
  const ref = doc(firestore, `contracts/${contractId}`);
  const data: Partial<IContract> = {
    status: approved ? "cleaner_approved" : "cleaner_declined",
    updatedAt: convertDateToTs(new Date()),
  };
  try {
    await updateDoc(ref, data);
  } catch (e) {
    throw new Error(e);
  }
};

export const cleanerDoneContract = async (contractId: string) => {
  const ref = doc(firestore, `contracts/${contractId}`);
  const data: Partial<IContract> = {
    status: "cleaner_done",
    updatedAt: convertDateToTs(new Date()),
  };
  try {
    await updateDoc(ref, data);
  } catch (e) {
    throw new Error(e);
  }
};

export const clientDoneContract = async (contractId: string) => {
  const ref = doc(firestore, `contracts/${contractId}`);
  const data: Partial<IContract> = {
    status: "client_done",
    updatedAt: convertDateToTs(new Date()),
  };
  try {
    await updateDoc(ref, data);
  } catch (e) {
    throw new Error(e);
  }
};
