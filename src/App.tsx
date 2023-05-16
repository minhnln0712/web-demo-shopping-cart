import "@fortawesome/fontawesome-free/css/all.min.css";
import React from "react";
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
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import NavGuest from "./components/Navbars/NavGuest/NavGuest";
import NavUser from "./components/Navbars/NavUser/NavUser";

function App() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(
    (state: any) => state.user.value.isAuthenticated
  );

  // const router = createBrowserRouter(createRoutesFromElements)

  // const

  const selectNavBar = () => (isAuthenticated ? <NavUser /> : <NavGuest />);

  return (
    <div className="App">
      <BrowserRouter>
        {selectNavBar()}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
