import React from "react";
import { routes } from "../../lib/utils/constants";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-dvh w-full">
        <h1>Page Not Found</h1>
        <Link to={routes.HOME}>Go back to Home</Link>
      </div>
    </>
  );
};

export default NotFound;
