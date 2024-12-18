import { useAuth } from "@/context/auth";
import axiosInstance from "@/lib/axiosInstance";
import { Product } from "@/lib/types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import AdminMenu from "../../components/AdminMenu";
import Layout from "../../components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  // @ts-ignore
  const [auth] = useAuth();
  const token = auth?.token;
  // Get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axiosInstance.get("/api/v1/product/get-product", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {

    // const serverUrl = process.env.REACT_APP_SERVER_URL;
    // console.log(serverUrl);
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/4">
          <AdminMenu />
        </div>
        <div className="w-full md:w-3/4 p-6">
          <h1 className="text-center text-2xl font-semibold mb-4">All Products List</h1>
          <div className="flex flex-wrap justify-start">
            {products?.map((p: any) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/product/${p.slug}`}
                className="m-2 no-underline"
              >
                <Card className="w-[18rem] shadow-lg">
                  <img
                    src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                    className="h-48 w-full object-cover rounded-t-lg mt-2"
                  />
                  <CardHeader>
                    <CardTitle className="text-lg font-medium">{p.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{p.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
