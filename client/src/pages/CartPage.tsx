import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-dropdown-menu";
import DropIn from "braintree-web-drop-in-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { Button } from "../components/ui/button";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import axiosInstance from "../lib/axiosInstance";

const CartPage = () => {
  // @ts-ignore
  const [auth] = useAuth();
  // @ts-ignore
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //total price calculation
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //delete item
  const removeCartItem = (pid: string) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axiosInstance.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   getToken();
  // }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axiosInstance.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-center text-2xl font-semibold mb-4">
          {!auth?.user ? "Hello Guest" : `Hello ${auth?.token && auth?.user?.name}`}
        </h1>
        <p className="text-center text-gray-600">
          {cart?.length
            ? `You have ${cart.length} items in your cart ${auth?.token ? "" : ", please login to checkout!"}`
            : "Your cart is empty"}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="space-y-4">
            {cart?.map((p) => (
              <Card key={p?._id} className="flex flex-row items-center space-x-4">
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="w-1/4 h-32 object-cover rounded"
                  alt={p?.name}
                />
                <div className="w-1/2">
                  <p className="font-semibold">{p?.name}</p>
                  <p className="text-sm text-gray-500">{p?.description?.substring(0, 30)}</p>
                  <p className="font-semibold">Price: {p?.price}</p>
                </div>
                <Button variant="destructive" onClick={() => removeCartItem(p._id)}>
                  Remove
                </Button>
              </Card>
            ))}
          </div>

          <div>
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-center mt-4">Cart Summary - Checkout</h2>
              </CardHeader>
              <Separator />
              <CardContent>
                <h4 className="text-lg font-semibold text-center">Total: {totalPrice()}</h4>

                {auth?.user?.address ? (
                  <div className="my-3 flex flex-col gap-4 justify-center items-center">
                    <h4 className="font-semibold">Current Address</h4>
                    <p>{auth?.user?.address}</p>
                    <Button
                      variant="outline"
                      onClick={() => navigate("/dashboard/user/profile")}
                      className="m-3"
                    >
                      Update Address
                    </Button>
                  </div>
                ) : (
                  <div className="my-3">
                    {auth?.token ? (
                      <Button
                        variant="outline"
                        onClick={() => navigate("/dashboard/user/profile")}
                      >
                        Update Address
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        onClick={() =>
                          navigate("/login", {
                            state: "/cart",
                          })
                        }
                      >
                        Please Login to Checkout
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
              <Separator />
              <CardFooter>
                <div className="mt-2">
                  {!clientToken || !auth?.token || !cart?.length ? null : (
                    <>
                      <DropIn
                        options={{
                          authorization: clientToken,
                          paypal: { flow: "vault" },
                        }}
                        onInstance={(instance) => setInstance(instance)}
                      />
                      <Button
                        onClick={handlePayment}
                        disabled={loading || !instance || !auth?.user?.address}
                      >
                        {loading ? "Processing..." : "Make Payment"}
                      </Button>
                    </>
                  )}
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
