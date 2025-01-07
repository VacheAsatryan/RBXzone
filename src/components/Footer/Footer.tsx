import React, { FC, useState, useRef, useEffect } from "react";
import "animate.css";

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
      className={`w-full py-5 min-h-[120px] px-5 bg-blue-900 transition duration-500 ease-in-out ${
        isVisible ? "animate__animated animate__bounceInUp" : "opacity-0"
      }`}
    >
      footer
    </div>
  );
};

export default Footer;
