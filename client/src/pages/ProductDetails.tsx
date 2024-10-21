import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50">
        <div>
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="w-full h-auto rounded-lg shadow-md"
            alt={product.name}
          />
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold">Product Details</h1>
          <hr />
          <h6 className="text-xl font-medium">Name: {product.name}</h6>
          <h6 className="text-md text-gray-700">Description: {product.description}</h6>
          <h6 className="text-md font-bold">
            Price:{" "}
            {product?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </h6>
          <h6 className="text-md text-gray-700">Category: {product?.category?.name}</h6>
          <Button className="bg-secondary text-white hover:bg-secondary-dark mt-4">ADD TO CART</Button>
        </div>
      </div>
      <hr className="my-6" />
      <div className="container mx-auto">
        <h4 className="text-2xl font-bold mb-4">Similar Products ➡️</h4>
        {relatedProducts.length < 1 && (
          <p className="text-center text-lg text-gray-500">No Similar Products found</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {relatedProducts?.map((p: any) => (
            <Card key={p._id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                className="w-full h-48 object-cover rounded-t-lg"
                alt={p.name}
              />
              <div className="p-4">
                <h5 className="text-lg font-semibold">{p.name}</h5>
                <h6 className="text-md text-gray-500">
                  {p.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </h6>
                <p className="text-sm text-gray-600">{p.description.substring(0, 60)}...</p>
                <div className="flex justify-between mt-4">
                  <Button
                    onClick={() => navigate(`/product/${p.slug}`)}
                    className="bg-info text-white hover:bg-info-dark"
                  >
                    More Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
