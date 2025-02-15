import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import FeaturedProducts from "./components/FeaturedProducts/FeaturedProducts";
import Footer from "./components/Footer/Footer";
import ProductPage from "./pages/ProductPage/ProductPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <FeaturedProducts />
            </>
          }
        />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
