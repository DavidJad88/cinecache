import { Outlet } from "react-router-dom";
import { SearchProvider } from "./context/searchContext";

import "./App.module.css";

//components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import SearchResultsOverlay from "./components/SearchResultOverlay/SearchResultOverlay";
function App() {
  return (
    <SearchProvider>
      <header>
        <Navbar />
      </header>
      <main>
        <SearchResultsOverlay />
        <Outlet />
      </main>
      <Footer></Footer>
    </SearchProvider>
  );
}

export default App;
