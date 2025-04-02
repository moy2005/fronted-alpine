import { useEffect } from "react";
import { useProducts } from "../../context/ProductContext"; 
import ProductCard from "../../components/ProductCard"; // Importa el componente para los productos


export function ManageProductsPage() {
  const { getProducts, products } = useProducts();

  useEffect(() => {
    getProducts(); // Llama a la función para obtener productos
  }, []);

  // Si no hay productos
  if (products.length === 0)
    return (
      <div>
        <div className="min-h-screen flex flex-col items-center p-6">
          <h1 className="text-3xl h1-form text-gray-300 mb-8">Catálogo de Productos</h1>
          <h2 className="tasks text-red-400">No hay productos disponibles</h2>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <h1 className="text-3xl h1-form text-gray-300 mb-8">Catálogo de Productos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
}

export default ManageProductsPage;

