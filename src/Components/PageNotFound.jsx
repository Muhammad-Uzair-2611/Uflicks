import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4">404</h1>
        <p className="text-lg sm:text-xl mb-6 text-center">
            Oops! The page you're looking for doesn't exist.
        </p>
        <Link
            to="/"
            className="px-4 py-2 sm:px-6 sm:py-3 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600 transition"
        >
            Go Back Home
        </Link>
    </div>
);
};

export default PageNotFound;
