import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

import { PaginationProps } from '../../../types/types';
import style from './Pagination.module.scss';

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  showTotalPages = true,
}) => {
  if (totalItems === 0) {
    return null;
  }
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (isNext: boolean) => {
    const nextPage = isNext ? currentPage + 1 : currentPage - 1;

    if (nextPage >= 1 && nextPage <= totalPages) {
      onPageChange(nextPage);
    }
  };

  return (
    <nav aria-label="Page navigation" className={style.pagination}>
      <button
        onClick={() => handlePageChange(false)}
        disabled={currentPage === 1}
        className={style.paginationButton}
        aria-label="Previous page"
      >
        <ChevronLeftRoundedIcon />
      </button>

      <span className={style.pageInfo}>
        Page {currentPage}
        {showTotalPages && totalPages ? ` of ${totalPages}` : ''}
      </span>

      <button
        onClick={() => handlePageChange(true)}
        disabled={currentPage >= totalPages}
        className={style.paginationButton}
        aria-label="Next page"
      >
        <ChevronRightRoundedIcon />
      </button>
    </nav>
  );
};
