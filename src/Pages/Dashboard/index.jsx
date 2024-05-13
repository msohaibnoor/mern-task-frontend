import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCarCount } from "../../Redux/features/Cars/carApi";

const Dashboard = ({ totalCars }) => {
  const dispatch = useDispatch();
  const { carCount } = useSelector((state) => state.cars);
  console.log(carCount);
  useEffect(() => {
    dispatch(
      getCarCount({
        apiEndpoint: "cars/count"
      })
    );
  }, []);

  return (
    <div className="flex flex-col items-center mt-16 h-screen">
      <h1 className="text-3xl font-bold mb-6">Car Management System</h1>
      <div className="bg-gray-200 rounded-lg p-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">Total Registered Cars</h2>
        <p className="text-4xl text-center font-bold">{carCount?.count ?? 0}</p>
      </div>
      <div className="flex space-x-4">
        <Link
          to="/category-management"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded"
        >
          Category Management
        </Link>
        <Link to="/car-management" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded">
          Car Management
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
