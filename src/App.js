import './App.css';
import Header from './Components/Header/Header';
import Main from './Components/Main/Main';
import Footer from './Components/Footer/Footer';

import NotFoundPage from "./Components/Main/Pages/NotFoundPage";
import AuthPage from "./Components/Main/Pages/AuthPage"
import GetCompaniesInfo from "./Components/Main/Pages/Companies"
import Result from "./Components/Main/Search/Result/Result"

import { Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'));
  const [isHasObject, setHasObject] = useState(!!localStorage.getItem('objects'));
  const isMobile = window.innerWidth <= 500;

  useEffect(() => {
  }, [isMobile]);

  useEffect(() => {
    const handleStorageChange = (event) => {
      setIsLoggedIn(!!localStorage.getItem('accessToken'));
      setHasObject(!!localStorage.getItem('objects'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div className="container">
      <Header isLoggedIn={isLoggedIn}></Header>
      <Routes>
        <Route path="/" element={<Main isMobile={isMobile} isLoggedIn={isLoggedIn} />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/notFound" element={<NotFoundPage />} />
        <Route path="/search" element={isLoggedIn ?<GetCompaniesInfo /> : <NotFoundPage />} />
        <Route path="/search/result" element={isLoggedIn ? <Result /> :  <Navigate to="/notFound" />} />
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App
