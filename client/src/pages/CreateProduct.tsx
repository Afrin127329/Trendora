import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/auth";
import axiosInstance from "@/lib/axiosInstance";
import { Select } from "antd";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AdminMenu from "../components/AdminMenu";
import Layout from "../components/Layout";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState<any>("");
  const [categoryName, setCategoryName] = useState<string | null>("");
  const divRef = useRef<HTMLDivElement>(null);
  // @ts-ignore
  const [auth] = useAuth();
  const token = auth?.token;
  // Fetch all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axiosInstance.get("/api/v1/category/get-category", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    getAllCategory();

    // if (divRef.current) {
    //   divRef.current.setAttribute('inert', 'true');
    // }
  }, []);

  // Handle product creation
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      const { data } = await axiosInstance.post("/api/v1/product/create-product", productData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data?.error) {
        toast.error(data?.message);
      } else {
        toast.success("Product Created Successfully");
        setTimeout(() => {
          navigate("/dashboard/admin/products");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container mx-auto my-6 p-6" ref={divRef}>
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/4">
            <AdminMenu />
          </div>
          <div className="w-full md:w-3/4">
            <h1 className="text-2xl font-bold md:w-2/4 mb-12 text-center">Create a Product</h1>
            <div className="space-y-6 w-full md:flex md:flex-wrap md:items-center md:gap-4">

              <div className="mb-3 md:w-2/4">
                <label className="block w-full py-2 px-4 border border-dashed rounded-md text-center cursor-pointer hover:bg-gray-50">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e: any) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>

                {photo && (
                  <div className="text-center mb-3">
                    <img
                      // @ts-ignore
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      className="object-cover h-48 mx-auto"
                    />
                  </div>
                )}
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger className="w-2/4 h-12 border rounded-md">{categoryName ? categoryName : "Select a Category"}</DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                  {categories?.map((c: any) => (
                    <DropdownMenuItem
                      key={c._id}
                      onSelect={() => (setCategory(c._id), setCategoryName(c.name))}
                      className="w-full"
                    >
                      {c.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <input
                type="text"
                value={name}
                placeholder="Write a name"
                className="w-2/4 p-2 border rounded-md"
                onChange={(e) => setName(e.target.value)}
              />

              <textarea
                value={description}
                placeholder="Write a description"
                className="w-2/4 p-2 border rounded-md"
                onChange={(e) => setDescription(e.target.value)}
              />

              <input
                type="number"
                value={price}
                placeholder="Write a price"
                className="w-2/4 p-2 border rounded-md"
                onChange={(e) => setPrice(e.target.value)}
              />

              <input
                type="number"
                value={quantity}
                placeholder="Write a quantity"
                className="w-2/4 p-2 border rounded-md"
                onChange={(e) => setQuantity(e.target.value)}
              />

              <Button
                className="w-2/4 py-2 px-4"
                onClick={handleCreate}
              >
                Create Product
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
