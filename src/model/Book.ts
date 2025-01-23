import { ReviewType } from '../model/Review';

export type BookType = {
  id: string;
  title: string;
  author: string;
  authorKey?: string;
  cover: string;
  description?: string | { value: string };
  year?: number | string;
  isCurrentlyReading?: boolean;
  rating?: number;
  pages?: string;
  reviews?: ReviewType[];
  recommendedBooks?: BookType[];
  editionKey?: string;
};

export type ClubCurrentBookType = {
  clubId: number;
  currentBookId: string;
};
