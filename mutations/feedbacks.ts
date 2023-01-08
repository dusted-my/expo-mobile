import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../firebase/config";
import {
  IContract,
  ICreateFeedbackForm,
  ICustomer,
  IFeedback,
} from "../interfaces";

export const createFeedback = async (
  feedback: ICreateFeedbackForm
): Promise<IFeedback> => {
  const ref = collection(firestore, `${feedback.cleanerDoc}/feedbacks`);
  const contractRef = doc(firestore, feedback.contractDoc);
  const cleanerRef = doc(firestore, feedback.cleanerDoc);
  try {
    const newDoc = await addDoc(ref, feedback);

    // updated contract
    const updatedContract: Partial<IContract> = { gaveFeedback: true };
    await updateDoc(contractRef, updatedContract);

    // update cleaner
    const snapshot = await getDocs(ref);
    let totalStars = 0;
    snapshot.forEach((snap) => {
      const feedback = snap.data() as IFeedback;
      totalStars += feedback.stars;
    });
    const stars = totalStars / snapshot.size;
    const updatedCleaner: Partial<ICustomer> = { stars };
    await updateDoc(cleanerRef, updatedCleaner);

    return { ...feedback, feedbackId: newDoc.id };
  } catch (e) {
    throw new Error(e);
  }
};
