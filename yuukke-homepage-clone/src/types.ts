export interface CategoryItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  itemCount?: number;
  popularItems?: string[];
}

export interface PillarItem {
  number: string;
  title: string;
  description: string;
  iconName: string;
}

export interface ImpactDistrict {
  name: string;
  craft: string;
  artisans: number;
  highlights: string[];
  image: string;
}

export interface ImpactMetric {
  amountSpent: number;
  artisanHoursSupported: number;
  trainingDaysProvided: number;
  districtsImpacted: number;
}

export interface ModalType {
  isOpen: boolean;
  type: 'marketplace' | 'builder' | 'mentor' | 'business_exchange' | 'category_detail' | 'service_space' | null;
  data?: any;
}
