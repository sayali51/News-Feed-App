import React from "react";

const NewsCard = ({ article }) => {
  // Destructure for cleaner access and provide safe fallbacks
  const { title, description, url, urlToImage, source, publishedAt } = article;

  // Function to format the date
  const formatDate = (dateString) => {
    if (!dateString) return 'Date Unavailable';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch (e) {
      return 'Invalid Date';
    }
  };

  return (
    // Use an 'article' semantic tag for better SEO/accessibility
    <article className="card bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-lg overflow-hidden">
      {urlToImage && (
        <figure className="relative h-48 w-full">
          <img
            src={urlToImage}
            // 1. Accessibility: Use title as alt text, or a generic fallback
            alt={title || "News article image"}
            className="w-full h-full object-cover"
            // Add loading="lazy" for performance
            loading="lazy" 
          />
        </figure>
      )}

      <div className="card-body p-4">
        {/* 2. Data Robustness: Use a fallback title */}
        <h2 className="card-title text-xl font-bold mb-2 text-gray-900">
          {title || "Untitled Article"}
        </h2>
        
        <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
          {/* 3. UX: Add published date for context */}
          <span className="font-medium">
            {formatDate(publishedAt)}
          </span>
          {/* Use optional chaining for safety */}
          {source?.name && (
            <span className="text-right">
              Source: <span className="font-semibold text-gray-600">{source.name}</span>
            </span>
          )}
        </div>

        {/* 4. Data Robustness: Use a fallback description and limit length if needed */}
        <p className="text-gray-700 mb-4 line-clamp-3">
          {description || "No description provided for this article. Click 'Read More' to visit the source."}
        </p>

        <div className="card-actions justify-end mt-2">
          <a
            href={url}
            rel="noopener noreferrer"
            target="_blank"
            // Use a specific button style, e.g., a blue primary button
            className="btn btn-sm btn-primary bg-blue-600 text-white hover:bg-blue-700 border-none"
            aria-label={`Read full article: ${title || "Untitled Article"}`}
          >
            Read More
          </a>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;