// import React from 'react';

import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex justify-center items-center h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: "url('https://assets.ramtracking.com/_assets/uploads/pages/5c8924-untitled-design-8.png')"
        }}
      >
        <div className="flex h-full flex-col justify-center items-center">
          <h1 className="text-3xl font-bold text-white mb-6">Welcome to the Car Management System</h1>
          <p className="text-white mb-4">Login to get started</p>
          <Link
            to="/sign-in"
            className="border mr-8 border-gray-500 bg-white hover:bg-gray-200 text-gray-800 py-2 px-4 rounded"
          >
            Log In
          </Link>
          {/* You can add more content here */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
