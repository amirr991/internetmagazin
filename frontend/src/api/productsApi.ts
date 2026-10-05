import api from "./axios";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string | null;
  is_available: boolean;
  category: {
    id: number;
    name: string;
  };
}

export const getProducts = async () => {
  const response = await api.get<Product[]>("products/");
  return response.data;
};