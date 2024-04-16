import "./App.css";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { Home } from "./pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import { Admin } from "./pages/Admin/Admin";
import { All } from "./pages/All/All";
import { Favorites } from "./pages/Favorites/Favorites";
import { YourCart } from "./pages/Yourcart/Yourcart";
import  Single  from "./pages/Home/Single/Single";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/all" element={<All />} />
        <Route path="/favorite" element={<Favorites />} />
        <Route path="/yourcrad" element={<YourCart />} />
        <Route path="/product/:id" component={<Single/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
