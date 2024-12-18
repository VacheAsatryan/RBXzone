import { FC } from "react";
import PaymentComponent from "../components/PaymentComponent/PaymentComponent";

const MainPage: FC = () => {
  return (
    <div className="w-full h-full flex-grow desktop:max-w-[1440px] mx-auto bg-black flex justify-center items-center px-2">
      <PaymentComponent />
    </div>
  );
};

export default MainPage;
