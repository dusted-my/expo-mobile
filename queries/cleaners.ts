import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { firestore } from "../firebase/config";
import { ICustomer } from "../interfaces";

export const getCleaners = async (ownUid: string, max?: number) => {
  const ref = collection(firestore, "users");
  const q = query(ref, where("isCleaner", "==", true), limit(max));
  const snapshot = await getDocs(q);
  const cleaners: ICustomer[] = [];
  snapshot.forEach((res) => {
    if (res.id === ownUid) return;
    cleaners.push({ id: res.id, ...(res.data() as ICustomer) });
  });
  return cleaners;
};
