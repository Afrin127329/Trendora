import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/auth";
import axiosInstance from "../lib/axiosInstance";

export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  // eslint-disable-next-line no-unused-vars
  // @ts-ignore
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const token = auth?.token;
        const res = await axiosInstance.get("/api/v1/auth/admin-auth", {
          headers: {
            Authorization: `Bearer ${token}`,  // Pass token in headers
          },
        });
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        console.error("Error during auth check:", error);
      }
    };

    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Loader path="" />;
}
