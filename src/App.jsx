import { Outlet } from "react-router-dom";
import { useState } from "react";
import "./App.module.css";

//components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <Footer></Footer>
    </>
  );
}

export default App;
