import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { firestore } from "../firebase/config";
import { IFeedback } from "../interfaces";

export const getFeedbacks = async (uid: string): Promise<IFeedback[]> => {
  const ref = collection(firestore, `users/${uid}/feedbacks`);
  const snapshot = await getDocs(ref);
  const feedbacks: IFeedback[] = [];
  snapshot.forEach((res) => {
    const feedback = { ...res.data(), feedbackId: res.id } as IFeedback;
    feedbacks.push(feedback);
  });
  return feedbacks;
};
