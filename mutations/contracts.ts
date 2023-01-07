import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/config";
import { IContract, ICreateContractForm } from "../interfaces";

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
  const data: Partial<IContract> = { status: "client_submitted" };
  try {
    await updateDoc(ref, data);
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
  };
  try {
    await updateDoc(ref, data);
  } catch (e) {
    throw new Error(e);
  }
};
