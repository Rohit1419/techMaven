import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import FeaturedProducts from "./components/FeaturedProducts/FeaturedProducts";
import Footer from "./components/Footer/Footer";
import ProductPage from "./pages/ProductPage/ProductPage";
import AddProduct from "./pages/AddProductPage/AddProduct";
import Collection from "./pages/Collection/Collection";
import ScrollTop from "./components/ScrollTop/ScrollTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollTop />
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
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/collection/:category" element={<Collection />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
