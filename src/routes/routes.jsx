import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import App from "../App";
import HomePage from "../pages/HomePage/HomePage";
import MovieDetails from "../pages/MovieDetails/MovieDetails";
import MovieList from "../pages/MovieList/MovieList";
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
      <Route path="/movie-list:id" element={<MovieDetails />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/*" element={<PageNotFound />} />
    </Route>
  )
);
