import React, { FunctionComponent } from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
};

const Pagination: FunctionComponent<PaginationProps> = ({
  currentPage,
  totalPages,
  handlePrevPage,
  handleNextPage,
}) => {
  return (
    <div className="flex flex-1 max-w-7xl mx-auto w-full px-4 py-3 mt-1 bg-white border-t border-gray-200 shadow-md sm:px-6">
      <div className="flex justify-between flex-1 sm:hidden">
        <button
          type="button"
          className={`relative inline-flex items-center px-3 py-1.5 text-sm font-medium text-indigo-500 bg-white border border-indigo-300 rounded-md hover:bg-indigo-50 ${
            currentPage === 1 ? "cursor-not-allowed hover:bg-white" : ""
          }`}
          data-id="pagination-prev"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          <svg
            stroke="currentColor"
            fill="none"
            viewBox="0 0 20 20"
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="ml-1 font-bold text-lg">Previous</span>
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          type="button"
          className={`relative inline-flex items-center px-3 py-1.5 text-sm font-medium text-indigo-500 bg-white border border-indigo-300 rounded-md hover:bg-indigo-50 ${
            currentPage === totalPages
              ? "cursor-not-allowed hover:bg-white"
              : ""
          }`}
          data-id="pagination-next"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <span className="mr-1 font-bold text-lg">Next</span>
          <svg
            stroke="currentColor"
            fill="none"
            viewBox="0 0 20 20"
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div
          className="relative z-0 flex justify-between w-full -space-x-px rounded-md"
          aria-label="Pagination"
        >
          <button
            type="button"
            className={`relative inline-flex items-center px-3 py-1.5 text-sm font-medium text-indigo-500 bg-white border border-indigo-300 hover:bg-indigo-50 sm:rounded-l-md ${
              currentPage === 1 ? "cursor-not-allowed hover:bg-white" : ""
            }`}
            data-id="pagination-prev"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              ></path>
            </svg>
            <span className="ml-1 font-bold text-lg">Previous Page</span>
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            className={`relative inline-flex items-center px-3 py-1.5 text-sm font-medium text-indigo-500 bg-white border border-indigo-300 hover:bg-indigo-50 sm:rounded-r-md ${
              currentPage === totalPages
                ? "cursor-not-allowed hover:bg-white"
                : ""
            }`}
            data-id="pagination-next"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <span className="mr-1 font-bold text-lg">Next Page</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
