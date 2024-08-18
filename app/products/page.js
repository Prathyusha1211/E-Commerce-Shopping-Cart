import ProductCard from "@/components/product_card";
import { getProducts } from "@/lib/services";


export default async function Page () {
  const products= await getProducts();

  return(
    <div>
      <div className="bg-slate-100 container mx-auto p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}





