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
      const res = await axiosInstance.get("/api/v1/auth/admin-auth");
      console.log(res.data);
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Loader path="" />;
}
