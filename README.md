# 📰 News Reader Application

## 📌 Project Overview
This is a **responsive News Reader web application** built using **React + Vite + Tailwind CSS**.  
It fetches real-time news from a public API and provides features like search, refresh, infinite scroll, offline detection, and bookmarking.

The project is designed with **simple UI, good UX, and proper functionality**, following instructor requirements.

---

## 🚀 Features Implemented

### 1. News Fetching
- Fetches latest news articles from **Spaceflight News API**
- Uses pagination with **infinite scrolling**

### 2. Search Functionality
- Users can search news by keyword
- Search resets previous articles and loads fresh results

### 3. Refresh Button
- Reloads articles from the first page
- Clears existing articles and fetches fresh data

> Note: API content may look similar because it is a public API, but the request is re-fetched correctly.

### 4. Online / Offline Detection
- Shows **Online** or **Offline** status at the top
- Works using `navigator.onLine` and browser events

### 5. Bookmarks
- Users can bookmark articles
- Bookmarks are saved in **localStorage**
- Data persists after page refresh

### 6. Responsive Design
- Works properly on:
  - Mobile (320px)
  - Tablet
  - Desktop
- Uses Tailwind CSS for responsive layout

---

## 🛠️ Technologies Used
- React (Hooks)
- Vite
- Tailwind CSS
- JavaScript (ES6)
- Public REST API

---
## Setup Instructions

1. Clone the repo:

```bash
git clone https://github.com/vinay-nethala/news_reader_app.git
cd news_reader_app
```
2 install dependencies
  ``` bash
npm install
```
3 Create a .env file in the root folder
```bash
VITE_NEWS_API_KEY=paste_my_api_key
```
4 Start the development server
```bash
npm run dev
```
5 Open your browser at these url
```bash
http://localhost:5173 or(open the port which it display)
```

