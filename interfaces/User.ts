import { Timestamp } from "firebase/firestore";

export interface ICustomer {
  id: string;
  email: string;
  fullName: string;
  isCleaner: boolean;
  status: "active" | "pending_cleaner";
  createdAt: Timestamp;
  updatedAt: Timestamp;

  // cleaner
  nric?: string;
  address?: string;
  hourlyRate?: number;
  gender?: string;
  imageUrl?: string;
  nricFrontImageUrl?: string;
  nricBackImageUrl?: string;
  services?: string[];
  stars?: number;
}

export interface IApplyCleanerForm {
  uid: string;
  fullName: string;
  nric: string;
  address: string;
  hourlyRate: string;
  gender: string;
  imageUrl: string;
  nricFrontImageUrl: string;
  nricBackImageUrl: string;
  services: string[];
  status: "pending_cleaner";
}
