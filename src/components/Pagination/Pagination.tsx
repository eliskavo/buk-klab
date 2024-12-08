import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

import { PaginationProps } from '../../../types/types';
import style from './Pagination.module.scss';

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showTotalPages = true,
}) => (
  <div className={style.pagination}>
    <button
      onClick={() => onPageChange(false)}
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
      onClick={() => onPageChange(true)}
      disabled={totalPages ? currentPage >= totalPages : false}
      className={style.paginationButton}
      aria-label="Next page"
    >
      <ChevronRightRoundedIcon />
    </button>
  </div>
);
