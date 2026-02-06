'use client';

import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '@/store/slices/cartSlice';
import { RootState } from '@/store/index';
import styles from './styles.module.scss';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  
  const isInCart = cartItems.some(item => item.id === product.id);

  const handleAddToCart = () => {
    if (!isInCart) {
      dispatch(addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      }));
    }
  };

  // Format price to integer
  const formattedPrice = Math.floor(product.price);

  // Truncate description to 42 characters
  const truncateDescription = (text: string) => {
    if (!text) return '';
    if (text.length <= 42) return text;
    return text.substring(0, 42) + ' ...';
  };

  return (
    <article className={styles.card}>
      <div className={styles.card__image}>
        <Image 
          src={product.image} 
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className={styles.card__content}>
        <h3 className={styles.card__title}>{product.name}</h3>
        
        <p className={styles.card__description}>
          {truncateDescription(product.description)}
        </p>

        <div className={styles.card__priceRow}>
          <div className={styles.card__ethIcon}>
            <Image 
              src="/assets/eth-icon.png" 
              alt="ETH" 
              fill 
            />
          </div>
          <p className={styles.card__price}>
            {formattedPrice} ETH
          </p>
        </div>

        <button 
          className={`${styles.card__button} ${isInCart ? styles['card__button--added'] : ''}`}
          onClick={handleAddToCart}
          disabled={isInCart}
        >
          {isInCart ? 'Adicionado ao Carrinho' : 'Comprar'}
        </button>
      </div>
    </article>
  );
};
