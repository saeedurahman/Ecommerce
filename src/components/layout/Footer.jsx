import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="bg-customDarkBlue h-16 flex items-center justify-center">
        <p>Copyright © {new Date().getFullYear()} ISDP</p>
      </footer>
    </>
  );
};

export default React.memo(Footer);
