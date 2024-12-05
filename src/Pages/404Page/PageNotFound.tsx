import React from "react";
import { Link } from "react-router-dom";
import "./PageNotFound.css";

const PageNotFound: React.FC = () => {
  return (
    <>
      <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen px-6 py-12">
        <h1>404 Error, Page Not Found</h1>
        <section className="error-container">
          <span className="four">
            <span className="screen-reader-text">4</span>
          </span>
          <span className="zero">
            <span className="screen-reader-text">0</span>
          </span>
          <span className="four">
            <span className="screen-reader-text">4</span>
          </span>
        </section>
        <div className="link-container">
          <Link className="e-nav__link" to="/"></Link>
        </div>
      </section>
    </>
  );
};

export default PageNotFound;
