import { Review } from '../../types/types';

export type Book = {
  id: string;
  title: string;
  author: string;
  cover: string;
  description: string;
  year: number | string;
  isCurrentlyReading?: boolean;
  rating?: number;
  pages?: number;
  reviews?: Review[];
  recommendedBooks?: Book[];
  editionKey?: string;
};
