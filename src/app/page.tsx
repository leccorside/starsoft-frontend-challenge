'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { ProductSkeleton } from '@/components/Skeleton';
import { useInfiniteProducts } from '@/hooks/useProducts';
import styles from './home.module.scss';
import { Fragment } from 'react';

export default function Home() {
  const { 
    data, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage, 
    status 
  } = useInfiniteProducts();

  const isLoading = status === 'pending';
  const isError = status === 'error';

  // Calculate progress
  const totalProducts = data?.pages[0]?.count || 0;
  const loadedProducts = data?.pages.flatMap(page => page.products).length || 0;
  const progressPercentage = totalProducts > 0 
    ? Math.min((loadedProducts / totalProducts) * 100, 100) 
    : 0;

  return (
    <main className={styles.main}>
      <Header />
      
      <div className={styles.content}>
        <div className={styles.content__grid}>
          {isLoading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))
          ) : isError ? (
            <div style={{ color: 'white', gridColumn: '1/-1', textAlign: 'center' }}>
              Erro ao carregar produtos. Tente novamente mais tarde.
            </div>
          ) : (
            data?.pages.map((page, i) => (
              <Fragment key={i}>
                {page.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </Fragment>
            ))
          )}
          
          {isFetchingNextPage && (
             Array.from({ length: 4 }).map((_, i) => (
              <ProductSkeleton key={`loading-more-${i}`} />
            ))
          )}
        </div>

        {!isLoading && !isError && (
          <div className={styles.content__actions}>
            {/* Progress Bar */}
            <div className={styles.content__progressBarContainer}>
              <div 
                className={styles.content__progressBar} 
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            <button 
              className={styles.content__loadMore}
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage 
                ? 'Carregando...' 
                : hasNextPage 
                  ? 'Carregar mais' 
                  : 'Você já viu tudo'
              }
            </button>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
