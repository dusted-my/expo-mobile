import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../firebase/config";
import { ICreateReportForm, IReport } from "../interfaces";

export const createReport = async (
  report: ICreateReportForm
): Promise<IReport> => {
  const ref = collection(firestore, "reports");
  try {
    const newDoc = await addDoc(ref, report);
    return { ...report, reportId: newDoc.id };
  } catch (e) {
    throw new Error(e);
  }
};
