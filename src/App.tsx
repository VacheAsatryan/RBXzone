// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Main from "./pages/Main";
import PaymentComponent from "./components/PaymentComponent/PaymentComponent";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/payment" element={<PaymentComponent />} />
      </Routes>
    </Router>
  );
};

export default App;
