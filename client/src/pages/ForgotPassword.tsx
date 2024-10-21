import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

const ForgotPasssword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/forgot-password", {
        email,
        newPassword,
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
    <Layout title={"Trendora - Forgot Password"}>
      <div className="flex justify-center items-center min-h-[90vh]">
        <Card className="w-full max-w-lg shadow-md p-6">
          <img src="./trendoraLogo.png" className="h-[10rem] w-[23rem] mx-auto" alt="Trendora Logo" />
          <h4 className="text-center text-2xl font-semibold mb-6">Reset Password</h4>

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
                required
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="answer" className="mb-2 block">
                Favorite Sport Name
              </Label>
              <Input
                type="text"
                id="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter Your Favorite Sport Name"
                required
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="newPassword" className="mb-2 block">
                New Password
              </Label>
              <Input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter Your Password"
                required
              />
            </div>

            <Button type="submit" className="w-full py-4">
              RESET
            </Button>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default ForgotPasssword;
