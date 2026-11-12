export type ReadingCategory = 'Tarô' | 'Baralho Cigano' | 'Tiragens Específicas';

export type CategoryFilter = 'Todas' | ReadingCategory;

export interface ReadingService {
  id: string;
  name: string;
  category: ReadingCategory;
  duration: string;
  format: string;
  price: number;
  shortDescription: string;
  fullDescription: string;
  preparationTip: string;
  highlights: string[];
  image: string;
  imageAlt: string;
}

export interface SelectedReading {
  service: ReadingService;
  quantity: number;
}

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  iconName: 'eye' | 'compass' | 'heart' | 'lock';
}

export interface MethodStep {
  number: string;
  title: string;
  description: string;
}
