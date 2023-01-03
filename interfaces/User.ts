import { Timestamp } from "firebase/firestore";

export interface ICustomer {
  id: string;
  email: string;
  fullName: string;
  status: "active" | "pending_cleaner";
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ICleaner extends ICustomer {
  nric: string;
  address: string;
  hourlyRate: number;
  gender: string;
  imageUrl: string;
  nricFrontImageUrl: string;
  nricBackImageUrl: string;
  isCleaner: string;
  services: string[];
  stars: number;
}
