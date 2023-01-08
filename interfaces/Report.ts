import { Timestamp } from "firebase/firestore";

export interface IReport {
  reportId: string;
  cleanerDoc: `/users/${string}`;
  clientDoc: `/users/${string}`;
  issues: string[];
  message: string;
  status: "active" | "inactive";
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ICreateReportForm extends Omit<IReport, "reportId"> {}
