import { FC } from "react";
import PaymentComponent from "../components/PaymentComponent/PaymentComponent";

const MainPage: FC = () => {
  return (
    <div className="w-full  desktop:max-w-[1024px] margin-auto flex-grow bg-blue-400 flex justify-center items-center px-2 ">
      <PaymentComponent />
    </div>
  );
};

export default MainPage;
