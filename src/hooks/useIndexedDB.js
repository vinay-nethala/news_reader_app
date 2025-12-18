import { openDB } from "idb";

const dbPromise = openDB("news-db", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("articles")) {
      db.createObjectStore("articles", { keyPath: "url" });
    }
    if (!db.objectStoreNames.contains("bookmarks")) {
      db.createObjectStore("bookmarks", { keyPath: "url" });
    }
  }
});

export async function saveArticle(article) {
  const db = await dbPromise;
  await db.put("articles", article);
}

export async function getAllArticles() {
  const db = await dbPromise;
  return db.getAll("articles");
}

export async function saveBookmark(article) {
  const db = await dbPromise;
  await db.put("bookmarks", article);
}

export async function getAllBookmarks() {
  const db = await dbPromise;
  return db.getAll("bookmarks");
}

export async function deleteBookmark(url) {
  const db = await dbPromise;
  await db.delete("bookmarks", url);
}