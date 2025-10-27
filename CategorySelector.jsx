import React from 'react';

const CategorySelector = ({ category, onCategoryChange }) => {
  const categories = [
    { id: 'general', name: 'General' },
    { id: 'business', name: 'Business' },
    { id: 'entertainment', name: 'Entertainment' },
    { id: 'health', name: 'Health' },
    { id: 'science', name: 'Science' },
    { id: 'sports', name: 'Sports' },
    { id: 'technology', name: 'Technology' },
  ];

  return (
    <nav aria-label="News Categories" className="my-4 flex justify-center overflow-x-auto p-2">
      <div 
        role="group" 
        className="btn-group flex-wrap md:flex-nowrap"
      >
        {categories.map((cat) => (
          <button
            onClick={() => onCategoryChange(cat.id)}
            className={`btn btn-sm m-1 transition-colors duration-200 ease-in-out whitespace-nowrap 
              ${category === cat.id 
                ? 'btn-active bg-blue-600 text-white hover:bg-blue-700' // Example: specific active styles
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300' // Example: specific inactive styles
              }`
            }
            key={cat.id}
            // 1. Accessibility Improvement
            aria-current={category === cat.id ? 'page' : undefined}
            // 2. Clearer Type/Hint for non-button styles (if 'btn' is just styling)
            type="button" 
          >
            {cat.name}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default CategorySelector;