import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Blogpage from "./components/Blogpage";
import Singleblog from "./components/Singleblog";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Blogpage />} />
          <Route path="/BlogPage/:id" element={<Singleblog />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
