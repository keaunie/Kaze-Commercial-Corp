import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ProductCard from "../components/ProductCard"; // Reuse your existing card component

export default function ProductInfo() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Detect base API URL (works on localhost + Vercel)
    const API_BASE = import.meta.env.VITE_API_BASE_URL || "";
    console.log("API base URL:", import.meta.env.VITE_API_BASE_URL);
    console.log("Environment:", import.meta.env.MODE);
    console.log("API base URL:", import.meta.env.VITE_API_BASE_URL || "(relative)");


    useEffect(() => {
        const fetchProductData = async () => {
            try {
                setLoading(true);

                // Fetch main product
                const res = await fetch(`${API_BASE}/api/products/${id}`);
                if (!res.ok) throw new Error("Failed to fetch product details");
                const data = await res.json();
                setProduct(data);

                // Fetch all products to find related ones
                const relatedRes = await fetch(`${API_BASE}/api/products`);
                const allProducts = await relatedRes.json();

                // Filter out current product and pick up to 3 random ones
                const others = allProducts.filter((p) => p.id !== id);
                const randomRelated = others.sort(() => 0.5 - Math.random()).slice(0, 3);
                setRelated(randomRelated);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProductData();
    }, [id]);

    if (loading)
        return (
            <section className="pt-[10%] min-h-screen grid place-items-center text-neutral-600">
                Loading product details...
            </section>
        );

    if (error)
        return (
            <section className="pt-[10%] min-h-screen grid place-items-center text-red-600">
                Error: {error}
            </section>
        );

    if (!product)
        return (
            <section className="pt-[10%] min-h-screen grid place-items-center text-neutral-600">
                Product not found.
            </section>
        );

    return (
        <section className="pt-[10%] pb-20 bg-[#f9f9f9] min-h-screen">
            <div className="container mx-auto px-6">
                {/* Back Link */}
                <Link
                    to="/products"
                    className="text-sm text-brand-600 hover:underline mb-6 inline-block"
                >
                    ← Back to Products
                </Link>

                {/* Product Details Section */}
                <div className="grid lg:grid-cols-2 gap-10 bg-white p-8 rounded-2xl shadow-sm border border-neutral-200">
                    {/* Product Image */}
                    <div className="flex justify-center items-center">
                        <img
                            src={product.img}
                            alt={product.name}
                            className="max-h-[400px] object-contain rounded-xl"
                        />
                    </div>

                    {/* Product Details */}
                    <div>
                        <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-yellow-500">⭐ {product.rating}</span>
                            <span className="text-neutral-500 text-sm">({product.id})</span>
                        </div>
                        <p className="text-lg font-semibold text-neutral-800 mb-4">
                            ₱{product.price}
                        </p>
                        <p className="text-neutral-600 leading-relaxed mb-6">
                            {product.description}
                        </p>

                        <button
                            onClick={() => alert("🛒 Added to cart (demo only)")}
                            className="rounded-xl bg-black px-6 py-3 text-white font-semibold hover:bg-neutral-800 transition"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>

                {/* Related Products Section */}
                {related.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-xl font-semibold mb-6">You may also like</h2>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {related.map((item) => (
                                <ProductCard
                                    key={item.id}
                                    product={item}
                                    addToCart={() => alert(`🛒 Added ${item.name} (demo only)`)}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
