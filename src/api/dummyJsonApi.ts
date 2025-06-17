import axios from "axios";

const API_URL = "https://dummyjson.com";

const api = axios.create({
  baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const getAllProducts = async () => {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductById = async (id: number) => {
    try {
        const response = await api.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching product with id ${id}:`, error);
        throw error;
    }
};

export const getCategories= async (category: string) => {
    try {
        const response = await api.get(`/products/category/${category}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching products in category ${category}:`, error);
        throw error;
    }
};

export const searchProducts = async (query: string) => {
    try {
        const response = await api.get(`/products/search?q=${query}`);
        return response.data;
    } catch (error) {
        console.error(`Error searching products with query "${query}":`, error);
        throw error;
    }
};

export const sortProducts = async (sortBy: string) => {
    try {
        const response = await api.get(`/products?sort=${sortBy}`);
        return response.data;
    } catch (error) {
        console.error(`Error sorting products by "${sortBy}":`, error);
        throw error;
    }
};



