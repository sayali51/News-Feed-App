import { useState, useEffect, useCallback } from "react"; // 1. Import useCallback
import axios from "axios";
import CategorySelector from "/CategorySelector"; // Removed 'components/' if components are at the same level as App.js
import NewsList from "/NewsList";
import Pagination from "/Pagination";

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false); // 2. Set initial loading state to false
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("general");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // 3. Environment Variable Safety Check
  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
  if (!API_KEY) {
    console.error("VITE_NEWS_API_KEY is not set in your environment variables!");
  }
  
  const PAGE_SIZE = 20;
  const NEWS_API_URL = "https://newsapi.org/v2/top-headlines"; // 4. Define base URL for clarity

  // 5. Use useCallback to memoize the function and prevent unnecessary re-renders
  const fetchNews = useCallback(async () => {
    // 6. Handle Missing API Key Error Early
    if (!API_KEY) {
      setError("API Key is missing. Please check your environment variables.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(NEWS_API_URL, {
        params: {
          country: "us",
          category: category,
          page: currentPage,
          pageSize: PAGE_SIZE,
          apiKey: API_KEY,
        },
      });

      // 7. Data validation check
      const totalResults = response.data.totalResults || 0;
      const articles = response.data.articles || [];

      setNews(articles);
      setTotalResults(totalResults);
      setTotalPages(Math.ceil(totalResults / PAGE_SIZE));
      
    } catch (err) {
      // 8. Improve error logging and display
      console.error("API Fetch Error:", err);
      if (err.response && err.response.status === 429) {
        setError("Rate limit exceeded. Try again later or check your API plan.");
      } else {
        setError("Failed to fetch news. Check your API key or network connection.");
      }
      setNews([]); // Clear old news on error
    } finally {
      setLoading(false);
    }
  }, [category, currentPage, API_KEY]); // Dependency array for useCallback

  useEffect(() => {
    fetchNews();
  }, [fetchNews]); // Dependency array for useEffect includes fetchNews

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    // Reset to page 1 for the new category
    setCurrentPage(1); 
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100"> {/* Updated background class */}
      <header className="bg-blue-600 text-white p-4 shadow-md"> {/* Updated header classes */}
        <div className="container mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight">Global News Hub</h1>
        </div>
      </header>
      <main className="container mx-auto p-4 md:p-8">
        <div className="mb-8">
          <CategorySelector
            category={category}
            onCategoryChange={handleCategoryChange}
          />
        </div>
        
        {/* Loading Spinner */}
        {loading && (
          <div className="flex flex-col items-center justify-center h-64">
            <svg className="animate-spin h-8 w-8 text-blue-600 mb-2" viewBox="0 0 24 24"> {/* Spinner SVG */}
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-gray-600">Loading headlines...</p>
          </div>
        )}
        
        {/* Error Message */}
        {error && <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg mb-6">{error}</div>}

        {/* Success Content */}
        {!loading && !error && (
          <>
            <div className="mb-6 text-center">
              <p className="text-xl font-medium text-gray-700">
                Displaying **{news.length}** articles. Total results available: **{totalResults}**
              </p>
            </div>
            
            <NewsList articles={news} />
            
            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPrev={handlePrev}
                  onNext={handleNext}
                />
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
