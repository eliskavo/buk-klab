export interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  description: string;
  year: number;
  isCurrentlyReading: boolean;
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
