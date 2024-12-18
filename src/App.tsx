import React, { FC } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

const App: FC = () => {
  return (
    <div className="h-screen overflow-hidden">
      {" "}
      {/* Контейнер с полной высотой и без скролла */}
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
};

export default App;
