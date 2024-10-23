import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth";
import { CircleX, Edit } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminMenu from "../../components/AdminMenu";
import CategoryForm from "../../components/Form/CategoryForm";
import Layout from "../../components/Layout";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import axiosInstance from "../../lib/axiosInstance";
const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [updatedName, setUpdatedName] = useState("");
  // @ts-ignore
  const [auth] = useAuth();
  const token = auth?.token;

  //handle Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.post(
        "/api/v1/category/create-category",
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
      e.target.reset()
    } catch (error) {
      console.log(error);
    }
  };

  //get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axiosInstance.get("/api/v1/category/get-category",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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

  //update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = auth?.token;
      const { data } = await axiosInstance.put(`/api/v1/category/update-category/${selected._id}`, { name: updatedName }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      if (data?.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //delete category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axiosInstance.delete(`/api/v1/category/delete-category/${pId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        toast.success("Category is deleted");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container mx-auto p-6">
        <div className="flex">
          <div className="w-1/4">
            <AdminMenu />
          </div>
          <div className="w-3/4">
            <h1 className="text-2xl font-semibold mb-4">Manage Category</h1>
            <div className="p-3 max-w-xl">
              <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
            </div>
            <div className="max-w-xl mt-4">
              <h3 className="text-xl font-semibold mb-4">All Categories</h3>
              <table className="table-auto w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border p-2">Name</th>
                    <th className="border p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c: any) => (
                    <tr key={c._id}>
                      <td className="border p-2 w-2/3">{c.name}</td>
                      <td className="border p-2 flex space-x-2 justify-center gap-4 items-center">
                        <Button
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(c.name);
                            setSelected(c);
                          }}
                        >
                          <Edit />
                        </Button>
                        <Button variant="destructive" onClick={() => handleDelete(c._id)}>
                          <CircleX />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Modal for editing */}
            <Dialog open={visible} onOpenChange={setVisible}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Category</DialogTitle>
                  <DialogDescription>Update the category name.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleUpdate}>
                  <Input value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} className="w-full mt-2" />
                  <DialogFooter className="mt-4">
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
