import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Financial from "./pages/Financial";
import Home from "./pages/Home";
import Product from "./pages/Product";

function RoutesControl() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/financial" element={<Financial />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesControl;
