import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { customLogout } from "../../Redux/features/User/userSlice";
import { Link, useLocation } from "react-router-dom";

const TopBar = ({ isPublic, isGuest, isPrivate, isAuth }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    // Dispatch the customLogout action to log the user out
    dispatch(customLogout());
  };

  return (
    <div className="w-full relative z-50 ">
      <nav className="  flex flex-col gap-4 sm:gap-0 sm:flex-row items-start sm:items-center sm:justify-between px-6 py-4 w-4/5 mx-auto">
        <div className="    ">
          <Link to="/">
            CARS
            {/* <img className="h-12 w-12   " src={"sksksk"} alt="Logo" /> */}
          </Link>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-0">
          {user?.user ? (
            <>
              <Link
                to="/dashboard"
                className="border mr-8 border-gray-500 bg-white hover:bg-gray-200 text-gray-800 py-2 px-4 rounded"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="border border-gray-500 bg-white hover:bg-gray-200 text-gray-800 py-2 px-4 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/sign-in">
              <button className="border-2 border-gray-500 bg-white hover:bg-gray-200 text-gray-800 py-2 px-4 rounded">
                Login
              </button>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default memo(TopBar);
