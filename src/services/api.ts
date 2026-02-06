import axios from 'axios';
import { Product } from '@/types/product';

export interface ProductsResponse {
  products: Product[]; // Changed from 'data' to 'products' to match API response
  count: number;
}

const API_URL = 'https://api-challenge.starsoft.games/api/v1';

export const api = axios.create({
  baseURL: API_URL,
});

export const getProducts = async (page = 1, rows = 12): Promise<ProductsResponse> => {
  const { data } = await api.get<ProductsResponse>('/products', {
    params: {
      page,
      rows,
      sortBy: 'id',
      orderBy: 'ASC',
    },
  });
  return data;
};
