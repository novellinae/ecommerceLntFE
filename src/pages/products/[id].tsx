import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getProductById } from "@/api/dummyJsonApi";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useCart } from "@/context/CartContext";
import Head from "next/head";
import { Product } from '@/types/product';

const ProductPage: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { addToCart } = useCart();

    useEffect(() => {
        if (id) {
            const fetchProduct = async () => {
                setLoading(true);
                setError(null);
                try {
                    const data = await getProductById(Number(id));
                    setProduct(data);
                } catch (error) {
                    setError('Failed to fetch product');
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            };
            fetchProduct();
        }
    }, [id]);

    if (loading) return <p className="text-center mt-8">Loading product details...</p>;
    if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;
    if (!product) return <p className="text-center mt-8">Product not found.</p>;

    return (
        <>
            <Head>
                <title>{product.title}</title>
            </Head>
            <Navbar />
            <div className="container mt-5">
                <h1 className="mb-4">{product.title}</h1>
                {/* PERBAIKAN DI SINI: Gunakan product.thumbnail atau product.images[0] */}
                <Image
                    src={product.thumbnail || product.image || '/placeholder-image.png'} // Gunakan thumbnail, fallback ke images[0], lalu ke placeholder
                    alt={product.title}
                    width={500}
                    height={500}
                    // Jika Anda menggunakan Tailwind atau CSS kustom, pastikan stylingnya benar
                    // className="object-contain" // Contoh styling untuk gambar
                />
                <p className="mt-3">{product.description}</p>
                <p className="text-muted">Category: {product.category}</p>
                {product.discountPercentage > 0 && (
                    <p className="text-lg text-green-600 dark:text-green-400">
                        Discount: {product.discountPercentage.toFixed(0)}%
                    </p>
                )}
                <p className="h4">${product.price.toFixed(2)}</p>
                <p>
                    Rating: {product.rating.rate} ⭐ ({product.rating.count} reviews)
                </p>
                {product.stock > 0 ? (
                    <p className="text-sm text-green-500">In Stock: {product.stock}</p>
                ) : (
                    <p className="text-sm text-red-500">Out of Stock</p>
                )}
                <button
                    className="btn btn-primary"
                    onClick={() => addToCart({
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        // Pastikan `image` yang dikirim ke keranjang adalah URL string, bukan array
                        image: product.thumbnail || product.image || '/placeholder-image.png',
                        stock: product.stock
                    })}
                    disabled={product.stock <= 0}
                >
                    {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
            </div>
        </>
    );
}
export default ProductPage;