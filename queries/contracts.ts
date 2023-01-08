import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { firestore } from "../firebase/config";
import { IContract } from "../interfaces";

export const getProposedContracts = async (uid: string) => {
  const ref = collection(firestore, "contracts");
  const q = query(ref, where("clientDoc", "==", `/users/${uid}`));
  const snapshot = await getDocs(q);
  const contracts: IContract[] = [];
  snapshot.forEach((res) => {
    const contract = res.data() as IContract;
    contracts.push({ ...contract, contractId: res.id });
  });
  return contracts;
};

export const getReceivedContracts = async (uid: string) => {
  const ref = collection(firestore, "contracts");
  const q = query(ref, where("cleanerDoc", "==", `/users/${uid}`));
  const snapshot = await getDocs(q);
  const contracts: IContract[] = [];
  snapshot.forEach((res) => {
    const contract = res.data() as IContract;
    if (contract.status === "client_submitting") return;
    contracts.push({ ...contract, contractId: res.id });
  });
  return contracts.sort((a, b) => b.startAt.seconds - a.startAt.seconds);
};
