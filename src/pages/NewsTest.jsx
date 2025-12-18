import { useEffect, useState } from "react";

export default function NewsTest() {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [search, setSearch] = useState("space");
  const [query, setQuery] = useState("space");
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  /* ------------------ LOAD BOOKMARKS ------------------ */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setBookmarks(saved);
  }, []);

  /* ------------------ FETCH NEWS ------------------ */
  const fetchNews = async (reset = false) => {
    if (loading) return;
    setLoading(true);

    const offset = reset ? 0 : page * 10;

    try {
      const res = await fetch(
        `https://api.spaceflightnewsapi.net/v4/articles/?search=${query}&limit=10&offset=${offset}`
      );
      const data = await res.json();

      setArticles(prev =>
        reset ? data.results : [...prev, ...data.results]
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(page === 0);
  }, [page, query]);

  /* ------------------ INFINITE SCROLL ------------------ */
  useEffect(() => {
    const handleScroll = () => {
      if (loading) return;
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        setPage(prev => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  /* ------------------ ONLINE / OFFLINE ------------------ */
  useEffect(() => {
    const online = () => setIsOnline(true);
    const offline = () => setIsOnline(false);

    window.addEventListener("online", online);
    window.addEventListener("offline", offline);

    return () => {
      window.removeEventListener("online", online);
      window.removeEventListener("offline", offline);
    };
  }, []);

  /* ------------------ ACTIONS ------------------ */
  const handleSearch = () => {
    setArticles([]);
    setPage(0);
    setQuery(search);
  };

  const refreshNews = () => {
    setArticles([]);
    setPage(0);
    fetchNews(true);
  };

  const clearBookmarks = () => {
    localStorage.removeItem("bookmarks");
    setBookmarks([]);
  };

  const addBookmark = article => {
    if (bookmarks.some(b => b.id === article.id)) return;
    const updated = [...bookmarks, article];
    setBookmarks(updated);
    localStorage.setItem("bookmarks", JSON.stringify(updated));
  };

  const isBookmarked = id => bookmarks.some(b => b.id === id);

  /* ------------------ UI ------------------ */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">

      {/* ONLINE / OFFLINE BAR */}
      <div
        className={`fixed top-0 left-0 w-full z-50 text-center text-xs py-1 font-semibold ${
          isOnline ? "bg-emerald-600" : "bg-rose-600"
        } text-white`}
      >
        {isOnline ? "🟢 Online" : "🔴 Offline – cached news"}
      </div>

      {/* HEADER */}
      <header className="pt-12 pb-6 text-center">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-800">
          📰 News Reader
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Search • Refresh • Offline Support
        </p>
      </header>

      {/* CONTROLS */}
      <div className="sticky top-6 z-40 bg-white/80 backdrop-blur border-y py-4">
        <div className="max-w-4xl mx-auto px-4">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search news..."
            className="w-full border rounded-md px-3 py-2 mb-3 focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={handleSearch}
              className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700"
            >
              Search
            </button>

            <button
              onClick={refreshNews}
              className="px-4 py-2 rounded-md bg-emerald-600 text-white text-sm hover:bg-emerald-700"
            >
              Refresh
            </button>

            <button
              onClick={clearBookmarks}
              className="px-4 py-2 rounded-md bg-rose-600 text-white text-sm hover:bg-rose-700"
            >
              Clear Cache
            </button>
          </div>
        </div>
      </div>

      {/* NEWS LIST */}
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {articles.map(article => (
          <article
            key={article.id}
            className="bg-white rounded-xl shadow-sm border p-5 transition hover:shadow-md"
          >
            <h2 className="text-lg font-semibold text-slate-800 mb-2">
              {article.title}
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              {article.summary}
            </p>

            <button
              onClick={() => addBookmark(article)}
              disabled={isBookmarked(article.id)}
              className={`mt-4 px-4 py-2 rounded-md text-sm font-medium ${
                isBookmarked(article.id)
                  ? "bg-slate-400 text-white cursor-not-allowed"
                  : "bg-amber-500 text-white hover:bg-amber-600"
              }`}
            >
              {isBookmarked(article.id) ? "Bookmarked" : "Bookmark"}
            </button>
          </article>
        ))}

        {loading && (
          <p className="text-center text-slate-500 font-medium">
            Loading more news…
          </p>
        )}
      </main>

      {/* BOOKMARKS */}
      <section className="max-w-4xl mx-auto px-4 pb-12">
        <h2 className="text-xl font-bold text-slate-800 mb-3">
          ⭐ Bookmarked Articles
        </h2>

        {bookmarks.length === 0 ? (
          <p className="text-slate-500">No bookmarks yet</p>
        ) : (
          <ul className="list-disc ml-6 text-slate-700 space-y-1">
            {bookmarks.map(b => (
              <li key={b.id}>{b.title}</li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}