export interface Book {
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
}

export type Review = {
  id: number;
  reviewerName: string;
  rating: number;
  reviewText: string;
  reviewDate: string;
  bookId: number;
};
