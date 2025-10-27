import React from "react";

const Pagination = ({ currentPage, totalPages, onPrev, onNext }) => {
  // Ensure currentPage is a number, defaulting to 1
  const safeCurrentPage = Number(currentPage) || 1;
  const safeTotalPages = Number(totalPages) || 1;

  const disabledPrev = safeCurrentPage <= 1;
  const disabledNext = safeCurrentPage >= safeTotalPages;

  return (
    // 1. Semantic HTML and A11y Role
    <nav aria-label="News Pagination" className="flex justify-center my-6">
      <div className="join">
        
        {/* Previous Button */}
        <button
          onClick={onPrev}
          className={`join-item btn ${disabledPrev ? "btn-disabled" : ""}`}
          // 2. A11y: Use aria-disabled instead of relying only on CSS for state
          aria-disabled={disabledPrev}
          type="button"
          disabled={disabledPrev} // Ensure the button is truly disabled
        >
          Previous
        </button>

        {/* Page Status Button/Display */}
        <span 
          className="join-item btn btn-ghost cursor-default" 
          role="status" // 3. A11y: Role to indicate dynamic status
          aria-live="polite" // Screen readers will announce changes to this element
        >
          Page {safeCurrentPage} of {safeTotalPages}
        </span>

        {/* Next Button */}
        <button
          onClick={onNext}
          className={`join-item btn ${disabledNext ? "btn-disabled" : ""}`}
          aria-disabled={disabledNext}
          type="button"
          disabled={disabledNext} // Ensure the button is truly disabled
        >
          Next
        </button>
      </div>
    </nav>
  );
};

export default Pagination;