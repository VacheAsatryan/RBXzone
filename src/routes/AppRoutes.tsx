import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "../pages/Main";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import VerticalStepper from "../components/Stepper/VerticalStepper";

const AppRoutes: React.FC = () => {
  return (
    <div className="flex flex-col h-full  ">
      <Header />
      <div className="flex-grow overflow-auto bg-[rgb(184,134,11)] ">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/pay" element={<VerticalStepper />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default AppRoutes;
