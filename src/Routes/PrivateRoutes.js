import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function PrivateRoute({ Component, role, props }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
  }, [navigate, user]);

  return <Component {...props} />;
}
