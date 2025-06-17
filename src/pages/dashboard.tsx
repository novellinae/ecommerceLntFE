// src/pages/index.tsx
import Head from 'next/head';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext'; // 
import { useState, useMemo, useEffect } from 'react';
import { getCategories } from '../api/dummyJsonApi'; // Untuk filter kategori 

const HomePage: React.FC = () => {
  const { products, loading, error } = useProducts(); // 
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState('none');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories(''); // Ambil semua kategori
        setCategories(['all', ...data]);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter berdasarkan pencarian 
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter berdasarkan kategori 
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    // Urutkan produk 
    switch (sortOption) {
      case 'price_asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating_desc':
        filtered.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case 'review_desc': // Assuming 'count' in rating is reviews
        filtered.sort((a, b) => b.rating.count - a.rating.count);
        break;
      // Tambahkan sort option lain sesuai kebutuhan API (diskon, stok)
      default:
        break;
    }

    return filtered;
  }, [products, searchTerm, selectedCategory, sortOption]); // 

  if (loading) return <p className="text-center mt-8">Loading products...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <Head>
        <title>E-commerce Home</title>
      </Head>
      <Navbar />

      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Our Products</h1>

        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
          {/* Fitur Cari Produk  */}
          <input
            type="text"
            placeholder="Search products..."
            className="p-2 border rounded-md w-full md:w-1/3 dark:bg-gray-700 dark:border-gray-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Filter Kategori  */}
          <select
            className="p-2 border rounded-md w-full md:w-auto dark:bg-gray-700 dark:border-gray-600"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>

          {/* Urutkan Produk  */}
          <select
            className="p-2 border rounded-md w-full md:w-auto dark:bg-gray-700 dark:border-gray-600"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="none">Sort By</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating_desc">Rating: High to Low</option>
            <option value="review_desc">Reviews: Most</option>
            {}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;