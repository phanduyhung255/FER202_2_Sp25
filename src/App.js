import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import MovieDetail from "./pages/MovieDetail/MovieDetail";
import Dashboard from "./pages/Dashboard/Dashboard";

import "bootstrap/dist/css/bootstrap.css";
import { createContext, useContext, useState } from "react";
import AddFilm from "./pages/AddFilm/AddFilm";
import EditFilm from "./pages/EditFilm/EditFilm";
import UserManagement from './pages/UserManagement/UserManagement'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Page404 from "./pages/404Page/404Page";
import Watch from "./pages/Watch/Watch";
export const AccountContext = createContext();

function App() {
  const [account, setAccount] = useState();
  console.log(account);
  return (
    <AccountContext.Provider value={{ account, setAccount }}>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/moviedetail/:id" element={<MovieDetail />} />
            <Route path="/watch/:id" element={<Watch/>}/>
            <Route path="*" element={<Page404 />} />
            {account?.role === 0 && (
              <Route path="/admin/dashboard" element={<Dashboard />} />
            )}
            {account?.role === 0 && (
              <Route path="/admin/addfilm" element={<AddFilm />} />
            )}
            {account?.role === 0 && (
              <Route path="/admin/editfilm/:id" element={<EditFilm />} />
            )}
            {account?.role === 0 && (
              <Route path="/admin/user" element={<UserManagement />} />
            )}
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </div>
    </AccountContext.Provider>
  );
}

export default App;
