import { Product } from "@/types/product";

export interface DummyJsonProduct {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}