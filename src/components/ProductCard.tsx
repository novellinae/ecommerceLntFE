import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
    product: {
        id: number;
        title: string;
        price: number;
        image: string;
        rating: {
            rate: number;
            count: number;
        };
    };
}   

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <div className="card mb-4">
            <Link href={`/products/${product.id}`}>
                <Image
                    src={product.image}
                    alt={product.title}
                    width={300}
                    height={300}
                    className="card-img-top"
                />
            </Link>
            <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">${product.price.toFixed(2)}</p>
                <p className="card-text">
                    Rating: {product.rating.rate} ({product.rating.count} reviews)
                </p>
                <button
                    className="btn btn-primary"
                    onClick={() => addToCart({ id: product.id, title: product.title, price: product.price, image: product.image })}
                >
                    Add to Cart
                </button>
            </div>
            <div className="card-footer text-muted">
                <Link href={`/products/${product.id}`} className="btn btn-secondary">
                    View Details
                </Link>
            </div>
        </div>
    );
}

export default ProductCard;