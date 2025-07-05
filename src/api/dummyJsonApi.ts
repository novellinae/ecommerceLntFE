import axios from "axios";
import { Product } from '@/types/product';

const API_URL = "https://dummyjson.com";

const api = axios.create({
  baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

interface DummyJsonProduct {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export const getAllProducts = async (): Promise<Product[]> => { // Menentukan tipe kembalian
  try {
    const response = await api.get<{ products: Product[] }>("/products"); // Menentukan tipe respons data
    return response.data.products;
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw error;
  }
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await api.get<Product>(`/products/${id}`);
  return response.data;
};

export const getCategories = async (): Promise<string[]> => {
  try {
    const response = await api.get<string[]>('/products/categories');
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  try {
    const response = await api.get<DummyJsonProduct>(`/products/search?q=${query}`);
    return response.data.products; // ✅ Ambil array-nya saja
  } catch (error) {
    console.error(`Error searching products with query "${query}":`, error);
    throw error;
  }
};

export const sortProducts = async (sortBy: string): Promise<Product[]> => {
  try {
    const response = await api.get<DummyJsonProduct>(`/products?sort=${sortBy}`);
    return response.data.products; // ✅ Ambil array-nya saja
  } catch (error) {
    console.error(`Error sorting products by "${sortBy}":`, error);
    throw error;
  }
};



