import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { firestore } from "../firebase/config";
import { ICleaner } from "../interfaces";

export const getCleaners = async (max?: number) => {
  const ref = collection(firestore, "users");
  const q = query(ref, where("isCleaner", "==", true), limit(max));
  const snapshot = await getDocs(q);
  const cleaners: ICleaner[] = [];
  snapshot.forEach((res) => {
    cleaners.push({ id: res.id, ...(res.data() as ICleaner) });
  });
  return cleaners;
};
