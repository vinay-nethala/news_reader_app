import { Bookmark, BookmarkMinus } from "lucide-react";
import { useCache } from "../context/CacheContext";

export default function ArticleCard({ article, isCached }) {
  const { bookmarks, addBookmark, removeBookmark } = useCache();

  const isBookmarked = bookmarks.some(b => b.url === article.url);

  const toggleBookmark = () => {
    if (isBookmarked) {
      removeBookmark(article.url);
    } else {
      addBookmark(article);
    }
  };

  return (
    <div className="border rounded p-4 shadow-sm">
      <h2 className="font-bold mb-1">{article.title}</h2>
      <p className="text-sm mb-2">{article.description}</p>
      <div className="flex items-center justify-between">
        {isCached && (
          <span className="text-green-600 text-xs font-semibold">
            Available Offline
          </span>
        )}
        <button onClick={toggleBookmark} aria-label="Bookmark article">
          {isBookmarked ? (
            <BookmarkMinus className="text-red-600" />
          ) : (
            <Bookmark className="text-gray-600" />
          )}
        </button>
      </div>
    </div>
  );
}