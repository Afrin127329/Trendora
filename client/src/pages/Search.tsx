import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { useSearch } from "../context/search";

const Search = () => {
  const navigate = useNavigate();
  // @ts-ignore
  const [values, setValues] = useSearch();

  return (
    <Layout title={"Search results"}>
      <div className="container mx-auto px-4">
        <div className="text-center my-8">
          <h1 className="text-3xl font-semibold">Search Results</h1>
          <h6 className="text-lg mt-2">
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length} product(s)`}
          </h6>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {values?.results.map((p) => (

              // Need to add shopping card here 
              <Card className="w-72" key={p._id}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="rounded-lg"
                  alt={p.name}
                />
                <div className="mt-4">
                  <h5 className="text-xl font-bold">{p.name}</h5>
                  <p className="text-sm text-gray-500 mt-2">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="text-lg font-medium mt-2 text-blue-600">$ {p.price}</p>
                  <Button
                    className="mt-4 w-full"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
