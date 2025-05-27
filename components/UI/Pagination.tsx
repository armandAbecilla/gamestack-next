import { JSX, ReactNode } from 'react';

type PaginationProps = {
  currentPage?: number;
  onSetPage: (page: number) => void;
  pageSize?: number;
  totalCount?: number;
  paginatingItemsClassNames?: string;
  children: ReactNode;
};

const Pagination = ({
  currentPage = 1,
  onSetPage,
  pageSize = 10, // max no of items to display per page
  totalCount = 0,
  paginatingItemsClassNames,
  children,
}: PaginationProps): JSX.Element => {
  const totalItems = totalCount;
  const totalPages = Math.ceil(totalItems / pageSize);

  function handleSetPage(page: number) {
    onSetPage(page);
  }

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const paginationButtonClasses =
    'cursor-pointer py-2 px-1 hover:text-stone-400 ';
  const disabledClasses = 'cursor-not-allowed! text-stone-300!';

  return (
    <>
      <div className={paginatingItemsClassNames}>{children}</div>

      {totalItems > pageSize && (
        <div className='mt-6 flex'>
          <ul className='mx-auto flex justify-center gap-2 rounded-full border border-stone-500 bg-stone-100/5 px-4 shadow backdrop-blur-md'>
            {/* <li>
            <button
              onClick={() => setCurrentPage(1)}
              className={`${paginationButtonClasses} ${isFirstPage && disabledClasses}`}
            >
              First
            </button>
          </li> */}
            <li>
              <button
                onClick={() => handleSetPage(currentPage - 1)}
                className={`${paginationButtonClasses} ${isFirstPage && disabledClasses}`}
                disabled={isFirstPage}
              >
                &lt; Prev
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, idx) => (
              <li key={idx}>
                <button
                  className={`${paginationButtonClasses} ${currentPage === idx + 1 && disabledClasses}`}
                  onClick={() => handleSetPage(idx + 1)}
                  disabled={currentPage === idx + 1}
                >
                  {idx + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => handleSetPage(currentPage + 1)}
                className={`${paginationButtonClasses} ${isLastPage && disabledClasses}`}
                disabled={isLastPage}
              >
                Next &gt;
              </button>
            </li>
            {/* <li>
            <button
              onClick={() => setCurrentPage(totalPages)}
              className={`${paginationButtonClasses} ${isLastPage && disabledClasses}`}
              disabled={isLastPage}
            >
              Last
            </button>
          </li> */}
          </ul>
        </div>
      )}
    </>
  );
};

export default Pagination;
