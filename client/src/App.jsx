import Navbar from "./components/Navbar";
import SignIn from "./components/Signin";
import SignUp from "./components/Signup";
import Home from "./pages/Home"
import CartPage from "./pages/Cart";
import { Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductListPage";


function App() {

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/auth/register" element={<SignUp />} ></Route>
        <Route path="/auth/login" element={<SignIn />} ></Route>
        <Route path="/products" element={<ProductList />}></Route>
        <Route path="/cart" element={<CartPage/>}></Route>

      </Routes>


    </>
  );
}

export default App
