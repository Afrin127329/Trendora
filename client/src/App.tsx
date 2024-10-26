import { Route, Routes } from "react-router-dom";
import './App.css';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminOrders from "./pages/Admin/AdminOrders";
import CreateCategory from './pages/Admin/CreateCategory';
import Products from "./pages/Admin/Products";
import UpdateProducts from "./pages/Admin/UpdateProducts";
import Users from "./pages/Admin/Users";
import CartPage from './pages/CartPage';
import Categories from './pages/Categories';
import { default as CategoryProduct, default as CreateProduct } from './pages/CreateProduct';
import ForgotPasssword from './pages/ForgotPassword';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Pagenotfound from './pages/PageNotFound';
import ProductDetails from './pages/ProductDetails';
import Register from './pages/Register';
import Search from './pages/Search';
import AdminRoute from "./Routes/AdminRoute";

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/product/:slug" element={<ProductDetails />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/category/:slug" element={<CategoryProduct />} />
      <Route path="/search" element={<Search />} />
      {/* <Route path="/dashboard" element={<PrivateRoute />}>
        <Route path="user" element={<Dashboard />} />
        <Route path="user/orders" element={<Orders />} />
        <Route path="user/profile" element={<Profile />} />
      </Route> */}
      <Route path="/dashboard" element={<AdminRoute />}>
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/create-category" element={<CreateCategory />} />
        <Route path="admin/create-product" element={<CreateProduct />} />
        <Route path="admin/product/:slug" element={<UpdateProducts />} />
        <Route path="admin/products" element={<Products />} />
        <Route path="admin/users" element={<Users />} />
        <Route path="admin/orders" element={<AdminOrders />} />
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPasssword />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/policy" element={<Policy />} /> */}
      <Route path="*" element={<Pagenotfound />} />
    </Routes>

  )
}

export default App
