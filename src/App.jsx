import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Layout from "./components/home/layout";
import Home from "./components/home/links/home";
import Movie from "./components/home/links/movies";
import Series from "./components/home/links/series";
import Bookmarks from "./components/home/links/bookmarks";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/movies" element={<Movie />} />
          <Route path="/series" element={<Series />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
