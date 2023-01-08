import { Timestamp } from "firebase/firestore";

export interface IFeedback {
  feedbackId: string;
  cleanerDoc: `/users/${string}`;
  clientDoc: `/users/${string}`;
  contractDoc: `/contracts/${string}`;
  message: string;
  stars: number;
  status: "active" | "inactive";
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ICreateFeedbackForm extends Omit<IFeedback, "feedbackId"> {}
