import { LoaderCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Filter from '../components/Filter'
import Hero from '../components/Hero'
import Layout from '../components/Layout'
import ShoppingCard from '../components/ShoppingCard'
import { Button } from '../components/ui/button'
import { useCart } from '../context/cart'
import axiosInstance from '../lib/axiosInstance'
const demoData = [
  {
    _id: 1,
    name: "Iphone 14",
    img: "/iphone2.webp",
    price: 100000
  },
  {
    _id: 2,
    name: "Oppo",
    img: "/Oppo.webp",
    price: 56000
  },
  {
    _id: 3,
    name: "Samsung",
    img: "/samsung2.webp",
    price: 30555
  },
]

const HomePage = () => {
  const navigate = useNavigate();
  // @ts-ignore
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState<any>([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axiosInstance.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axiosInstance.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all: any = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axiosInstance.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"Trendora - shop now"}>
      <Hero />
      <Filter />

      {/* all products  */}
      <div>
        <h3 className='mb-4 text-zinc-950  text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-center '>All Mobile Phones</h3>
        <div className='grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-3 gap-4'>
          {demoData?.map((p) => (
            <ShoppingCard key={p._id} data={p} setCart={setCart} cart={cart} />
          ))}
        </div>
        <div className='w-full mx-auto flex justify-center'>
          {products && products.length < total && (
            <Button
              variant={"ghost"}
              className="text-xl text-zinc-950"
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}
            >
              {loading ? (
                "Loading ..."
              ) : (
                <>
                  {" "}
                  Loadmore <LoaderCircle />
                </>
              )}
            </Button>
          )}
        </div>
      </div>

    </Layout>
  )
}

export default HomePage