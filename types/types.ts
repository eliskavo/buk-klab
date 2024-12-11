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

export type PaginationProps = {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => Promise<void> | void;
  showTotalPages?: boolean;
};
