import React, { useState, useEffect } from "react";

function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (windowHeight + scrollTop >= documentHeight - 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    toggleVisibility();

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []); 

  if (!isVisible) {
    return null;
  }

  return (
    <footer
      className="py-3"
      style={{
        backgroundColor: "#e3f2fd",
        width: "100%",
        height: "150px",
        position: "fixed", 
        bottom: 0, 
        left: 0, 
        zIndex: 1000,
        transition: "all 0.3s ease-in-out"
      }}
    >
      <div
        className="container d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100%" }}
      >
        <div>
          <img
            src="/img/logo.svg"
            alt="logo"
            style={{
              width: "120px", 
              height: "auto", 
              objectFit: "contain",
            }}
          />
        </div>

        <div className="text-muted mt-3">
          &copy; {new Date().getFullYear()} AS News. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;