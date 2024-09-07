import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function Private() {
  const [checkedLogin, setCheckedLogin] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setCheckedLogin(token);
    } else {
      {
        navigate("/login");
      }
    }
  });
  return (
    <div>
      {checkedLogin ? (
        <>
          <Outlet />
        </>
      ) : (
        <>{null}</>
      )}
    </div>
  );
}

export default Private;
