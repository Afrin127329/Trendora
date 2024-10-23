import Layout from "@/components/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth";
import axiosInstance from "../lib/axiosInstance";

export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  // eslint-disable-next-line no-unused-vars
  // @ts-ignore
  const [auth, setAuth] = useAuth();

  const location = useLocation();
  const { pathname } = location;
  console.log(pathname)

  useEffect(() => {
    const authCheck = async () => {
      try {
        const token = auth?.token;
        const res = await axiosInstance.get("/api/v1/auth/admin-auth", {
          headers: {
            Authorization: `Bearer ${token}`,
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

  return ok ? <Outlet /> : (
    <Layout title="Admin Login - Trendora">
      {
        pathname === "/dashboard/admin/create-category" ? (
          <div className="flex flex-col space-y-3 w-full min-h-full justify-center items-center mt-4">
            <Skeleton className="h-[225px] w-[350px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[350px]" />
              <Skeleton className="h-4 w-[300px]" />
            </div>
          </div>
        ) : (
          <Skeleton className="h-4 w-[250px]" />
        )
      }
      <Loader path="" />
    </Layout>
  );
}
