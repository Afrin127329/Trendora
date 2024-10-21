import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useAuth } from "../context/auth";
import axiosInstance from "../lib/axiosInstance";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //@ts-ignore
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        toast.success(res.data && res.data.message);
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Trendora - Login"}>
      <div className="flex justify-center items-center min-h-[90vh]">

        <Card className="w-full max-w-lg shadow-md p-6">
          <img src="./trendoraLogo.png" className="h-[10rem] w-[23rem] mx-auto" alt="Trendora Logo" />
          <h4 className="text-center text-2xl font-semibold mb-6">Login to your existing account</h4>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="email" className="mb-2 block">
                Email Address
              </Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                autoFocus
                required
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="password" className="mb-2 block">
                Password
              </Label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Your Password"
                required
              />
            </div>

            <div className="mb-4 flex justify-between items-center">
              <p>Don't have an account? <a href="/register" className="text-blue-600">Register</a></p>
              <Button
                type="button"
                variant="link"
                className="text-blue-600"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </Button>
            </div>

            <Button type="submit" className="w-full px-4">
              Login
            </Button>

            <p className="text-xs text-zinc-600 mt-4 text-center">Admin credentials: afrinnahar1999@gmail.com, pass: afrinnahar1999</p>
            <p className="text-xs text-zinc-600 mt-4 text-center">User credentials: test@gmail.com, pass: afrinnahar1999</p>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default LoginForm;
