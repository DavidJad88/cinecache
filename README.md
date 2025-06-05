# React + Vite

# CineCache

**Live Demo:** [https://cinecache.netlify.app/](https://cinecache.netlify.app/)  
**GitHub Repo:** [https://github.com/DavidJad88/cinecache](https://github.com/DavidJad88/cinecache)

---

## Project Overview

CineCache is a responsive React application for movie lovers. Users can browse, search, rate, and review films, as well as manage their personal movie library. The app integrates with The Movie Database (TMDB) API for up-to-date film data and uses Firebase for authentication and persistent user data.

---

## Key Features

- **Authentication System**

  - User signup with email verification
  - Secure login and logout
  - Protected routes for authenticated users
  - Auth context for global user state

- **Movie Browsing**

  - Genre-based movie filtering
  - Real-time search with overlay results (search results overlay main content)
  - Responsive movie cards with details, ratings, and reviews

- **Personal Library**

  - Add/remove movies to/from your library
  - Rate and review movies
  - Persistent storage with Firestore

- **Form Handling**

  - All forms (signup, signin, contact, reviews) are validated
  - Clear error and success feedback for users

- **API Integration**

  - TMDB API for movie data
  - Firebase Firestore for user data

- **Responsive Design**
  - Fully responsive layout
  - Component-based architecture

---

## Technical Stack

- **Frontend:** React (with Vite), React Router, CSS Modules
- **Database:** Firebase Firestore
- **Authentication:** Firebase Auth
- **API:** The Movie Database (TMDB)
- **Deployment:** Netlify

---

## User Interface

- Structured, accessible layout for all pages
- Responsive design for all devices
- Clear feedback for all form interactions (errors, validation, success)
- Overlay search results that supercede main content for a focused search experience

---

## Credits & Licensing

- All film data is provided by and used with license from [The Movie Database (TMDB)](https://www.themoviedb.org/)
- Rating system inspired by [YouTube tutorial](https://www.youtube.com/watch?v=BmhU_MoxNqQ&t=387s)
- For consistency in data and debugging, A.I. tools were used as assistants

---
