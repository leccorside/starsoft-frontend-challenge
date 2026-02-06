'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { ProductSkeleton } from '@/components/Skeleton';
import { useInfiniteProducts } from '@/hooks/useProducts';
import styles from './home.module.scss';
import { Fragment } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteProducts();

  const isLoading = status === 'pending';
  const isError = status === 'error';

  // Calculate progress
  const totalProducts = data?.pages[0]?.count || 0;
  const loadedProducts = data?.pages.flatMap((page) => page.products).length || 0;
  const progressPercentage =
    totalProducts > 0 ? Math.min((loadedProducts / totalProducts) * 100, 100) : 0;

  return (
    <main className={styles.main}>
      <Header />

      <div className={styles.content}>
        <motion.div
          className={styles.content__grid}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {isLoading ? (
            Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
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

          {isFetchingNextPage &&
            Array.from({ length: 4 }).map((_, i) => <ProductSkeleton key={`loading-more-${i}`} />)}
        </motion.div>

        {!isLoading && !isError && (
          <div className={styles.content__actions}>
            {/* Progress Bar */}
            <div className={styles.content__progressBarContainer}>
              <motion.div
                className={styles.content__progressBar}
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            <motion.button
              className={styles.content__loadMore}
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
              whileHover={!(!hasNextPage || isFetchingNextPage) ? { scale: 1.02 } : {}}
              whileTap={!(!hasNextPage || isFetchingNextPage) ? { scale: 0.98 } : {}}
            >
              {isFetchingNextPage
                ? 'Carregando...'
                : hasNextPage
                  ? 'Carregar mais'
                  : 'Você já viu tudo'}
            </motion.button>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
