'use client';
import React, { createContext, useContext, useState, ReactNode, useEffect} from 'react';
import { getAllProducts } from '@/api/dummyJsonApi';
import { Product } from '@/types/product';


interface ProductContextType {
    products: Product[];
    loading: boolean;
    error: string | null;
}
const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getAllProducts();
                setProducts(data);
            } catch (err) {
                setError('Failed to fetch products');
                console.error(err); 
            } finally {
                setLoading(false);
            }
        };
        if (products.length === 0) {
            fetchProducts();
        }
    }, [products.length]);
    return (
        <ProductContext.Provider value={{ products, loading, error }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
};