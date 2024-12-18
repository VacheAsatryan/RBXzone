import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "../pages/Main";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const AppRoutes: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      {" "}
      {/* Используем Flexbox для вертикальной раскладки */}
      <Header />
      <div className="flex-grow overflow-auto">
        {" "}
        {/* MainPage займет оставшееся пространство */}
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default AppRoutes;
