import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../Layouts/Header/Header";

import MainPage from "../Pages/MainPage";
import CartPage from "../Pages/CartPage";
import DetailPage from "../Pages/DetailPage";
const Navigation =()=>{
    return(
        <>
        <Router>
          <nav>
          <Header/>
          </nav>
      <Routes>
        <Route exact path="/"  element={<MainPage/>} />
        <Route path="/cart" element={<CartPage/>} />
        <Route path="/detail/:id" element={<DetailPage/>} />
      </Routes>
    </Router>
        </>
    )
}

export default Navigation;