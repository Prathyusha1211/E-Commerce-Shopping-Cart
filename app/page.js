import ProductCard from "@/components/product_card";
import { getProducts } from "@/lib/services";
import { useEffect, useState } from "react";

export default async function Page() {
  // return <div>API URL not found</div>
  if (!process.env.NEXT_PUBLIC_API_URL) {
    return <div>API URL not found</div>;
  }

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <div className="text-center py-10">
          <div className="loader">Loading...</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
