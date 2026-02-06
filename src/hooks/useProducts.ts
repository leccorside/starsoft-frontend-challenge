import { useInfiniteQuery } from '@tanstack/react-query';
import { getProducts } from '@/services/api';

export function useInfiniteProducts() {
  return useInfiniteQuery({
    queryKey: ['products-infinite'],
    queryFn: ({ pageParam = 1 }) => getProducts(pageParam, 8),
    getNextPageParam: (lastPage, allPages) => {
      // Calculate total loaded items
      const loadedCount = allPages.flatMap(p => p.products).length;
      
      // If we loaded less than total count, there's a next page
      if (loadedCount < lastPage.count) {
        return allPages.length + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5,
  });
}
