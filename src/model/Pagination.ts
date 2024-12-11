export type PaginationProps = {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => Promise<void> | void;
  showTotalPages?: boolean;
};
