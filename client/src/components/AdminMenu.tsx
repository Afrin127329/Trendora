import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="text-center">
      <div className="flex flex-col space-y-2">
        <h4>
          <NavLink
            to="/dashboard/admin"
            className="text-lg font-semibold hover:text-primary transition-colors"
            style={{ backgroundColor: "transparent", border: "none" }}
          >
            Admin Panel
          </NavLink>
        </h4>
        <NavLink
          to="/dashboard/admin/create-category"
          className="p-2 text-base hover:bg-primary/10 rounded-lg transition-all"
        >
          Create Category
        </NavLink>
        <NavLink
          to="/dashboard/admin/create-product"
          className="p-2 text-base hover:bg-primary/10 rounded-lg transition-all"
        >
          Create Product
        </NavLink>
        <NavLink
          to="/dashboard/admin/products"
          className="p-2 text-base hover:bg-primary/10 rounded-lg transition-all"
        >
          Products
        </NavLink>
        <NavLink
          to="/dashboard/admin/orders"
          className="p-2 text-base hover:bg-primary/10 rounded-lg transition-all"
        >
          Orders
        </NavLink>
      </div>
    </div>
  );
};

export default AdminMenu;
