import Layout from "@/components/Layout";
import { Skeleton } from "@/components/ui/skeleton";
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
        ) : (pathname === "/dashboard/admin/create-product") ? (
          <div className="container mx-auto my-6 p-6">
            <div className="flex  gap-8">
              <div className="w-full md:w-1/4">
                <Skeleton className="h-full rounded-md" />
              </div>
              <div className="w-full md:w-3/4">
                <h1 className="text-2xl font-bold md:w-2/4 mb-12 text-center">
                  <Skeleton className="h-8" />
                </h1>
                <div className="space-y-6 w-full md:flex md:flex-wrap md:items-center md:gap-4">
                  <div className="mb-3 md:w-2/4">
                    <Skeleton className="block w-full h-12 rounded-md" />
                    <Skeleton className="object-cover h-48 mx-auto mt-2 rounded-md" />
                  </div>

                  <div className="w-2/4">
                    <Skeleton className="h-12 rounded-md" />
                  </div>

                  <Skeleton className="w-2/4 h-12 rounded-md" />
                  <Skeleton className="w-2/4 h-12 rounded-md" />
                  <Skeleton className="w-2/4 h-12 rounded-md" />
                  <Skeleton className="w-2/4 h-12 rounded-md" />

                  <Skeleton className="w-2/4 h-12 rounded-md" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Skeleton className="h-4 w-[250px]" />

        )
      }
    </Layout>
  );
}
