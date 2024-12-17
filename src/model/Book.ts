import { ReviewType } from '../model/Review';

export type BookType = {
  id: string;
  title: string;
  author: string;
  authorKey?: string;
  cover: string;
  description?: string;
  year?: number | string;
  isCurrentlyReading?: boolean;
  rating?: number;
  pages?: number;
  reviews?: ReviewType[];
  recommendedBooks?: BookType[];
  editionKey?: string;
};
