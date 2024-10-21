import AdminMenu from "../../components/AdminMenu";
import Layout from "../../components/Layout";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  //@ts-ignore
  const [auth] = useAuth();

  return (
    <Layout title="Admin Dashboard">
      <div className="container mx-auto my-6 p-6">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/4">
            <AdminMenu />
          </div>
          <div className="w-full md:w-3/4">
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-xl font-semibold">
                Admin Name: {auth?.user?.name}
              </h3>
              <h3 className="text-xl font-semibold">
                Admin Email: {auth?.user?.email}
              </h3>
              <h3 className="text-xl font-semibold">
                Admin Contact: {auth?.user?.phone}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
