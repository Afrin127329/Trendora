import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import axiosInstance from "../lib/axiosInstance";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Trendora - Register"}>
      <div className="flex justify-center items-center min-h-[90vh]">
        <Card className="w-full max-w-lg shadow-md p-6">
          <img src="./trendoraLogo.png" className="h-[10rem] w-[23rem] mx-auto" alt="Trendora Logo" />
          <h4 className="text-center text-2xl font-semibold mb-6">Register</h4>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="name" className="mb-2 block">
                Name
              </Label>
              <Input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Your Name"
                required
                autoFocus
              />
            </div>

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

            <div className="mb-4">
              <Label htmlFor="phone" className="mb-2 block">
                Phone Number
              </Label>
              <Input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter Your Phone"
                required
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="address" className="mb-2 block">
                Address
              </Label>
              <Input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter Your Address"
                required
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="answer" className="mb-2 block">
                Favorite Sport
              </Label>
              <Input
                type="text"
                id="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="What is Your Favorite Sport?"
                required
              />
            </div>

            <Button type="submit" className="w-full py-4">
              REGISTER
            </Button>
          </form>
        </Card>
      </div>
    </Layout>

  );
};

export default Register;
