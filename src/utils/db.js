import { openDB } from 'idb';

const DB_NAME = 'news-reader-db';
const DB_VERSION = 1;

export const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('bookmarks')) {
        db.createObjectStore('bookmarks', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('offlineQueue')) {
        db.createObjectStore('offlineQueue', { autoIncrement: true });
      }
    },
  });
};

export const addBookmark = async (article) => {
  const db = await initDB();
  return db.put('bookmarks', article);
};

export const getBookmarks = async () => {
  const db = await initDB();
  return db.getAll('bookmarks');
};

export const removeBookmark = async (id) => {
  const db = await initDB();
  return db.delete('bookmarks', id);
};