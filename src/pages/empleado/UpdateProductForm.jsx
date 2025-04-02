import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";

function UpdateProductForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getProduct, updateProduct } = useProducts();
    
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        specifications: "",
        fabricante: "",
        origen: "",
        category: ""
    });

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const data = await getProduct(id);
                setProduct(data);
            } catch (error) {
                console.error(error);
            }
        };
        loadProduct();
    }, [id]);

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProduct(id, product);
            navigate('/manage-products');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <form 
                onSubmit={handleSubmit}
                className="bg-zinc-800 p-8 rounded-lg shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold text-white mb-6">Actualizar Producto</h2>
                
                <div className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre del producto"
                        value={product.name}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-zinc-700 text-white"
                    />
                    
                    <textarea
                        name="description"
                        placeholder="Descripción"
                        value={product.description}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-zinc-700 text-white"
                    />
                    
                    <input
                        type="number"
                        name="price"
                        placeholder="Precio"
                        value={product.price}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-zinc-700 text-white"
                    />
                    
                    <input
                        type="number"
                        name="stock"
                        placeholder="Stock"
                        value={product.stock}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-zinc-700 text-white"
                    />
                    
                    <input
                        type="text"
                        name="fabricante"
                        placeholder="Fabricante"
                        value={product.fabricante}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-zinc-700 text-white"
                    />
                    
                    <input
                        type="text"
                        name="origen"
                        placeholder="Origen"
                        value={product.origen}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-zinc-700 text-white"
                    />
                    
                    <input
                        type="text"
                        name="category"
                        placeholder="Categoría"
                        value={product.category}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-zinc-700 text-white"
                    />
                </div>

                <div className="flex gap-4 mt-6">
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors"
                    >
                        Actualizar
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/manage-products')}
                        className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded transition-colors"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdateProductForm;

