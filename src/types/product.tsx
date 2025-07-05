export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  thumbnail: string;
  rating: {
    rate: number;
    count: number;
  };
  stock: number;
  discountPercentage: number;
}