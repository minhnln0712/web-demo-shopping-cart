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
import Guest from "./pages/Guest/Guest";
import User from "./pages/User/User";
import { Provider, useSelector } from "react-redux";
import { store } from "./redux/store";

function App() {
  const isAuthenticated = useSelector(
    (state: any) => state.user.value.isAuthenticated
  );

  const;

  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route />
            <Route path="/" element={<Guest />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user" element={<User />} />
            <Route />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
