import axios from 'axios';
import { Product } from '@/types/product';

export interface ProductsResponse {
  products: Product[]; // Changed from 'data' to 'products' to match API response
  count: number;
}

// Adjust API URL if needed, or keep using the one provided
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
  // The API returns { data: [...], count: ... } structure, but we typed it as { products: ... }
  // Let's check the actual response structure. 
  // Based on previous interaction, response is:
  // {"products":[{"id":1,...}],"count":32} or {"data":[{"id":1...}],"metadata":{...}}?
  // User provided: {"products":[{"id":1...}],"count":32}
  return data; 
};

export const getProductById = async (id: string): Promise<Product> => {
  try {
    // Try to fetch all products and find the one with the matching ID
    // Since we don't have a direct endpoint documented that works reliable for single item
    // We will fetch a larger list to find it. 
    // Optimization: If we had a real backend, we'd use /products/:id
    
    // Attempt 1: Fetch from list (client-side filtering fallback)
    const { data } = await api.get<ProductsResponse>('/products', {
      params: {
        page: 1,
        rows: 50, // Fetch enough rows to likely include our ID
        sortBy: 'id',
        orderBy: 'ASC',
      },
    });

    // Check if 'products' exists in data, otherwise check 'data' property if structure varies
    const list = data.products || (data as any).data || [];
    
    const product = list.find((p: Product) => p.id === Number(id));
    
    if (!product) {
        throw new Error(`Product with ID ${id} not found in the list`);
    }
    
    return product;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
};
