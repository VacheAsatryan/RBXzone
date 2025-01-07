import React, { FC, useState, useRef, useEffect } from "react";
import "animate.css";
import { FaTelegramPlane, FaEnvelope } from "react-icons/fa";

const Footer: FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 } // Процент видимости элемента (50%)
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={footerRef}
      id="footer"
      className={`w-full py-5 min-h-[120px] px-5 bg-black transition duration-500 ease-in-out ${
        isVisible ? "animate__animated animate__bounceInUp" : "opacity-0"
      }`}
    >
      <div className="text-white text-center mb-4">
        <h2 className="text-white text-lg transition">Свяжитесь с нами</h2>
      </div>
      <div className="text-white flex justify-center gap-10">
        <a
          href="https://t.me/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-white hover:text-blue-400 transition"
        >
          <FaTelegramPlane size={24} className="mr-2" />
          Telegram
        </a>
        <a
          href="mailto:yourname@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-white hover:text-red-400 transition"
        >
          <FaEnvelope size={24} className="mr-2" />
          Gmail
        </a>
      </div>
    </div>
  );
};

export default Footer;
