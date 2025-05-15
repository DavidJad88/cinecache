import { Outlet } from "react-router-dom";
import { useState } from "react";
import "./App.module.css";
import Navbar from "./components/Navbar/Navbar";
function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
