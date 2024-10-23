/* eslint-disable no-unused-vars */
import axiosInstance from "@/lib/axiosInstance";
import moment from "moment";
import { useEffect, useState } from "react";
import AdminMenu from "../../components/AdminMenu";
import Layout from "../../components/Layout";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { useAuth } from "../../context/auth";

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancel",
  ]);
  const [orders, setOrders] = useState([]);
  // @ts-ignore
  const [auth] = useAuth();
  const token = auth?.token;

  const getOrders = async () => {
    try {
      const { data } = await axiosInstance.get("/api/v1/auth/all-orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      await axiosInstance.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All Orders Data"}>
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/4">
          <AdminMenu />
        </div>
        <div className="w-full md:w-3/4 p-6">
          <h1 className="text-center text-2xl font-semibold mb-4">All Products</h1>
          {orders?.map((o: any) => (
            <div key={o._id} className="mb-4 border rounded-lg shadow-lg">
              <Table>
                <TableCaption>A list of all orders.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">#</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Buyer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Quantity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">{o.index}</TableCell>
                    <TableCell>
                      {/* <Select
                        onChange={(value) => handleChange(o._id, value)}
                        defaultValue={o?.status}
                      >
                        {status.map((s, i) => (
                          <SelectItem key={i} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </Select> */}

                      <Select onValueChange={(value) => handleChange(o._id, value)} defaultValue={o?.status}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent>
                          {status.map((s, i) => (
                            <SelectItem key={i} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>{o?.buyer?.name}</TableCell>
                    <TableCell>{moment(o?.createAt).fromNow()}</TableCell>
                    <TableCell>{o?.payment.success ? "Success" : "Failed"}</TableCell>
                    <TableCell>{o?.products?.length}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div className="container p-4">
                {o?.products?.map((p) => (
                  <div key={p._id} className="flex mb-2 p-3 border rounded-md bg-gray-50">
                    <div className="w-1/4">
                      <img
                        src={`/api/v1/product/product-photo/${p._id}`}
                        alt={p.name}
                        className="h-24 w-24 object-cover rounded-md"
                      />
                    </div>
                    <div className="w-3/4 pl-4">
                      <p className="font-medium">{p.name}</p>
                      <p className="text-gray-600">{p.description.substring(0, 30)}</p>
                      <p className="font-semibold">Price: {p.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
