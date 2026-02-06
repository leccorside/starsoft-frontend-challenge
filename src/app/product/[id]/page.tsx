'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getProductById } from '@/services/api';
import { Product } from '@/types/product';
import { addItem } from '@/store/slices/cartSlice';
import { RootState } from '@/store/index';
import styles from './styles.module.scss';

export default function ProductPage() {
  const params = useParams();
  const id = params?.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isInCart = product ? cartItems.some(item => item.id === product.id) : false;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id) {
          // Note: In a real app with SSG/SSR we might pass data via props, 
          // but for this dynamic client route we fetch on mount
          const data = await getProductById(id);
          setProduct(data);
        }
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product && !isInCart) {
      dispatch(addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
        quantity: 1
      }));
    }
  };

  if (loading) {
    return (
      <main className={styles.main}>
        <Header />
        <div className={styles.content}>
          <p style={{ color: 'white' }}>Carregando detalhes...</p>
        </div>
        <Footer />
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className={styles.main}>
        <Header />
        <div className={styles.content}>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ color: 'white', marginBottom: '1rem' }}>Produto não encontrado</h2>
            <Link href="/" className={styles.backLink}>
              <ArrowLeft size={20} />
              Voltar para a loja
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <Header />
      
      <div className={styles.content}>
        <div style={{ width: '100%', maxWidth: '1000px' }}>
          <Link href="/" className={styles.backLink}>
            <ArrowLeft size={20} />
            Voltar
          </Link>

          <article className={styles.product}>
            <div className={styles.product__image}>
              <Image 
                src={product.image} 
                alt={product.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 500px"
              />
            </div>
            
            <div className={styles.product__details}>
              <div>
                <h1 className={styles.product__name}>{product.name}</h1>
                <div className={styles.product__priceRow}>
                  <div className={styles.product__price}>
                    <Image src="/assets/eth-icon.png" alt="ETH" width={32} height={32} />
                    {Math.floor(product.price)} ETH
                  </div>
                </div>
              </div>

              <div className={styles.product__description}>
                <p>{product.description}</p>
              </div>

              <div className={styles.product__actions}>
                <button 
                  className={styles.product__button}
                  onClick={handleAddToCart}
                  disabled={isInCart}
                >
                  {isInCart ? 'Adicionado ao Carrinho' : 'Comprar'}
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>

      <Footer />
    </main>
  );
}
