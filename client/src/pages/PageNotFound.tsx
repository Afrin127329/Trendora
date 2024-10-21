import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { Button } from "../components/ui/button";

const Pagenotfound = () => {
  return (
    <Layout title={"Go Back - Page Not Found"}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center">
        <h1 className="text-7xl font-extrabold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Oops! Page Not Found
        </h2>
        <Link to="/">
          <Button className="bg-primary text-white hover:bg-primary-dark">
            Go Back
          </Button>
        </Link>
      </div>
    </Layout>
  );
};

export default Pagenotfound;
