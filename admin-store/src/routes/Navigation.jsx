import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import AuthPage from "../pages/AuthPage";
import ProductPage from "../pages/Product/ProductPage";
import StorePage from "../pages/Store/StorePage";
import StoreDetailPage from "../pages/Store/StoreDetailPage"
import AccountPage from "../pages/Account/AccountPage";
import DashboardPage from "../pages/Dashboard/DashboardPage"
import ProductViewPage from "../pages/Product/NewProductPage";
import ProductDetailPage from "../pages/Product/ProductDetailPage"
import NewStorePage from "../pages/Store/NewStorePage";
import NewAccountPage from "../pages/Account/NewAccountPage";
import AccountDetailPage from "../pages/Account/AccountDetailPage";
import SaleHistory from "../pages/Dashboard/SaleHistory";
import ExpensesHistory from "../pages/Dashboard/ExpensesHistory";
import DamageHistory from "../pages/Dashboard/DamageHistory";
const Navigation = ()=>{


    return(
        <Router>
            <Routes>    
            <Route path="/" element={<AuthPage/>}/>
            <Route element={<PrivateRoute/>}>
            <Route path="/product" element={<ProductPage/>}/>
                 <Route path="/product/:id" element={<ProductDetailPage/>}/>
                 <Route path="/product/addProduct" element={<ProductViewPage/>}/>
                <Route path="/account" element={<AccountPage/>}/>
                <Route path="/account/:id" element={<AccountDetailPage/>}/>
                <Route path="/account/addAccount" element={<NewAccountPage/>}/>
                <Route path="/store" element={<StorePage/>}/>
                <Route path="/store/:id" element={<StoreDetailPage/>}/>
                <Route path="/store/addStore" element={<NewStorePage/>}/>
                <Route path="/dashboard" element={<DashboardPage/>}/>
                <Route path="/dashboard/sale" element={<SaleHistory/>}/>
                <Route path="/dashboard/expenses" element={<ExpensesHistory/>}/>
                <Route path="/dashboard/damage" element={<DamageHistory/>}/>
            </Route>
            </Routes>
        </Router>
    )
}

export default Navigation;