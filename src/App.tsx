import "@fortawesome/fontawesome-free/css/all.min.css";
import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import User from "./pages/User/User";
import Cart from "./pages/Cart/Cart";
import Product from "./pages/Product/Product";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import NavGuest from "./components/Navbars/NavGuest/NavGuest";
import NavUser from "./components/Navbars/NavUser/NavUser";
import { login } from "./redux/userSlice";

function App() {
  const userRole = useAppSelector((state: any) => state.user.value.roleId);

  // const router = createBrowserRouter(createRoutesFromElements)

  const selectNavBar = () => {
    switch (userRole) {
      case "1":
        break;
      case "2":
        return <NavUser />;
      default:
        return <NavGuest />;
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        {selectNavBar()}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<User />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:productId" element={<Product />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
