import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getProductById } from "@/api/dummyJsonApi";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useCart } from "@/context/CartContext";
import Head from "next/head";

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

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
                try {
                    const data = await getProductById(Number(id));
                    setProduct(data);
                } catch (err) {
                    setError('Failed to fetch product');
                    console.error(err); 
                } finally {
                    setLoading(false);
                }
            };
            fetchProduct();
        }
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!product) return <div>Product not found</div>;

    return (
        <>
            <Head>
                <title>{product.title}</title>
            </Head>
            <Navbar />
            <div className="container mt-5">
                <h1 className="mb-4">{product.title}</h1>
                <Image src={product.image} alt={product.title} width={500} height={500} />
                <p className="mt-3">{product.description}</p>
                <p className="text-muted">Category: {product.category}</p>
                <p className="h4">${product.price.toFixed(2)}</p>
                <p>Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
                <button
                    className="btn btn-primary"
                    onClick={() => addToCart({ id: product.id, title: product.title, price: product.price, image: product.image })}
                >
                    Add to Cart
                </button>
            </div>
        </>
    );
}
export default ProductPage;