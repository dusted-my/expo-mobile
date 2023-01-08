import { Timestamp } from "firebase/firestore";

export interface IContract {
  contractId: string;
  address: string;
  cleanerDoc: string;
  clientDoc: string;
  createdAt: Timestamp;
  notes: string;
  endAt: Timestamp;
  paymentStatus: "not_applicable" | "client_paid" | "cleaner_received";
  total: number;
  serviceRequired: string;
  startAt: Timestamp;
  status:
    | "client_submitting"
    | "client_submitted"
    | "cleaner_approved"
    | "cleaner_declined"
    | "cleaner_done"
    | "client_done";
  updatedAt: Timestamp;
  gaveFeedback?: boolean;
}

export interface ICreateContractForm extends Omit<IContract, "contractId"> {}

export interface IPaymentIntentBody {
  amount: number;
  contractId: string;
}

export interface IPaymentSheetParams {
  clientSecret: string;
}
