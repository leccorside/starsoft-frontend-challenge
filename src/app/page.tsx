'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { ProductSkeleton } from '@/components/Skeleton';
import styles from './home.module.scss';

// Mock data for initial layout test (will be replaced by API in Item 2.2)
const MOCK_PRODUCTS = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  name: `NFT Item ${i + 1}`,
  price: 0.5 + i * 0.1,
  image: '/assets/logo.png', // Fallback image for now
  description: 'Description',
  createdAt: new Date().toISOString()
}));

export default function Home() {
  const isLoading = false; 

  return (
    <main className={styles.main}>
      <Header />
      
      <div className={styles.content}>
        <div className={styles.content__grid}>
          {isLoading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))
          ) : (
            MOCK_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
