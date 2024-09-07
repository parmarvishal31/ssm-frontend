import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function Public() {
  const [checkedLogin, setCheckedLogin] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setCheckedLogin(token);
    }
  });
  return (
    <div>
      {checkedLogin ? (
        <>{navigate("/")}</>
      ) : (
        <>
          <Outlet />
        </>
      )}
    </div>
  );
}

export default Public;
