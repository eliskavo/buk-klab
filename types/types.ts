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

export type Review = {
  id: number;
  reviewerName: string;
  rating: number;
  reviewText: string;
  reviewDate: string;
  bookId: number;
};

export type LoadingProps = {
  message?: string;
};

export type FetchBooksParams = {
  query?: string;
  page?: number;
  limit?: number;
};

export type PaginationProps = {
  currentPage: number;
  totalPages?: number;
  onPageChange: (isNext: boolean) => void;
  showTotalPages?: boolean;
};
