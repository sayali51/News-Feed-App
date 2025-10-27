import React from "react";
import NewsCard from "./NewsCard";

// Destructure articles with a default value of an empty array for safety
const NewsList = ({ articles = [] }) => {
  // 1. Conditional Rendering: Show a message if no articles are available
  if (articles.length === 0) {
    return (
      <div className="flex justify-center items-center h-48 bg-gray-50 rounded-lg shadow-inner mt-8 p-4">
        <p className="text-xl font-medium text-gray-600">
          No news articles found for this category or search term.
        </p>
      </div>
    );
  }

  return (
    // Add margin top/bottom for spacing and padding for better component integration
    <div className="py-6 px-4"> 
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* 2. Key Prop: Use a stable unique ID instead of array index */}
            {articles.map((article) => (
                <NewsCard key={article.url} article={article} />
            ))}
        </div>
    </div>
  );
};

export default NewsList;