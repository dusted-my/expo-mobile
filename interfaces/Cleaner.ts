import { Timestamp } from "firebase/firestore";

export interface ICleaner {
  id: string;
  address?: string;
  createdAt: Timestamp;
  email: string;
  fullName: string;
  hourlyRate?: number;
  imageUrl?: string;
  isCleaner?: string;
  phoneNo?: string;
  categories?: string[];
  stars: number;
  status: "active" | "pending_cleaner";
  updatedAt: Timestamp;
}
