import { Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./Home";
import About from "./About";
import Error404 from "./Error404";
import CoinPage from "./coins/CoinPage";
import CoinDetails from "./coins/CoinDetails";
import CoinCreate from "./coins/CoinCreate";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/coins" element={<CoinPage />} />
        <Route path="/coins/:id" element={<CoinDetails />} />
        <Route path="/coins/create" element={<CoinCreate />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}
