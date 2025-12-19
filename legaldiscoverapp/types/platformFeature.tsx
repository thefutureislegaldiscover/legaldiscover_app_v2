import { LucideIcon } from "lucide-react";

export type FeatureStatus = 'ACTIVE' | 'BETA';

export interface FeatureItem {
  icon: LucideIcon;
  name: string;
  description: string;
  status: FeatureStatus;
}