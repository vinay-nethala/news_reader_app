export async function fetchNews(page = 0, query = "technology") {
  const res = await fetch(
    `https://hn.algolia.com/api/v1/search?query=${query}&page=${page}`
  );
  const data = await res.json();

  // Convert HackerNews format to your app format
  return {
    articles: data.hits.map(item => ({
      title: item.title || "No title",
      description: item.story_text || "No description",
      url: item.url || item.story_url || "#",
    }))
  };
}