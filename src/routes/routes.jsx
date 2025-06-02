import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { RouteGuard } from "./RouteGuard";

import App from "../App";
import HomePage from "../pages/HomePage/HomePage";
import MovieDetails from "../pages/MovieDetails/MovieDetails";
import MovieList from "../pages/MovieList/MovieList";
import MovieLibrary from "../pages/MovieLibrary/MovieLibrary";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import Profile from "../pages/Profile/Profile";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import VerifyEmail from "../pages/VerifyEmail/VerifyEmail";
import Contact from "../pages/Contact/Contact";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="/movie-list" element={<MovieList />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/contact" element={<Contact />} />

      <Route
        path="/movie-list/:id"
        element={
          <RouteGuard>
            <MovieDetails />
          </RouteGuard>
        }
      />
      <Route
        path="/movie-library"
        element={
          <RouteGuard>
            <MovieLibrary />
          </RouteGuard>
        }
      />
      <Route
        path="/profile"
        element={
          <RouteGuard>
            <Profile />
          </RouteGuard>
        }
      />
      <Route
        path="/verify-email"
        element={
          <RouteGuard>
            <VerifyEmail />
          </RouteGuard>
        }
      />

      <Route path="/*" element={<PageNotFound />} />
    </Route>
  )
);
