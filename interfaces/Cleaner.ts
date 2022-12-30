import { Timestamp } from "firebase/firestore";

export interface ICleaner {
  id: string;
  address?: string;
  createdAt: Timestamp;
  email: string;
  fullName: string;
  imageUrl?: string;
  isCleaner?: string;
  phoneNo?: string;
  skills?: string[];
  stars: number;
  status: "active" | "inactive";
  updatedAt: Timestamp;
}
