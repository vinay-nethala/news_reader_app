import { useEffect, useState, useRef } from "react";
import { fetchNews } from "../api/newsApi";
import ArticleCard from "../components/ArticleCard";
import NetworkIndicator from "../components/NetworkIndicator";
import CacheManagementPanel from "../components/CacheManagementPanel";
import CacheStatus from "../components/CacheStatus";
import { saveArticle, getAllArticles } from "../hooks/useIndexedDB";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("technology");
  const [loading, setLoading] = useState(false);
  const [cachedUrls, setCachedUrls] = useState(new Set());

  const isMounted = useRef(true);

  // Load from IndexedDB on mount
  useEffect(() => {
    getAllArticles().then(cached => {
      if (isMounted.current) {
        setCachedUrls(new Set(cached.map(a => a.url)));
      }
    });
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Fetch news from API (and cache in IndexedDB)
  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await fetchNews(page, query);
        if (!isMounted.current) return;

        setArticles(prev => [...prev, ...data.articles]);
        data.articles.forEach(article => saveArticle(article));
        setCachedUrls(prev => {
          const newSet = new Set([...prev]);
          data.articles.forEach(a => newSet.add(a.url));
          return newSet;
        });
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted.current) setLoading(false);
      }
    }
    load();
  }, [page, query]);

  const handleSearch = (e) => {
    setArticles([]);
    setPage(1);
    setQuery(e.target.value || "technology");
  };

  const handleLoadMore = () => setPage(p => p + 1);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <NetworkIndicator />
      <h1 className="text-2xl font-bold mb-4">Offline News Reader</h1>

      <input
        type="text"
        placeholder="Search news..."
        onChange={handleSearch}
        className="w-full p-2 border rounded mb-4"
      />

      <CacheStatus />
      <CacheManagementPanel />

      <div className="grid gap-4">
        {articles.map(article => (
          <ArticleCard
            key={article.url}
            article={article}
            isCached={cachedUrls.has(article.url)}
          />
        ))}
      </div>

      <button
        onClick={handleLoadMore}
        disabled={loading}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Loading..." : "Load More"}
      </button>
    </div>
  );
}