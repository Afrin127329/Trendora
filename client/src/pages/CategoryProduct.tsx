import { Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
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

  // Fetch all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
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
      const { data } = await axios.post("/api/v1/product/create-product", productData);
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container mx-auto my-6 p-6">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/4">
            <AdminMenu />
          </div>
          <div className="w-full md:w-3/4">
            <h1 className="text-2xl font-bold mb-6">Create Product</h1>
            <div className="space-y-6 w-full md:w-3/4">
              <Select
                placeholder="Select a category"
                size="large"
                className="w-full mb-3"
                onChange={(value) => setCategory(value)}
              >
                {categories?.map((c: any) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>

              <div className="mb-3">
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
              </div>

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

              <input
                type="text"
                value={name}
                placeholder="Write a name"
                className="w-full p-2 border rounded-md"
                onChange={(e) => setName(e.target.value)}
              />

              <textarea
                value={description}
                placeholder="Write a description"
                className="w-full p-2 border rounded-md"
                onChange={(e) => setDescription(e.target.value)}
              />

              <input
                type="number"
                value={price}
                placeholder="Write a price"
                className="w-full p-2 border rounded-md"
                onChange={(e) => setPrice(e.target.value)}
              />

              <input
                type="number"
                value={quantity}
                placeholder="Write a quantity"
                className="w-full p-2 border rounded-md"
                onChange={(e) => setQuantity(e.target.value)}
              />

              <button
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={handleCreate}
              >
                CREATE PRODUCT
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
