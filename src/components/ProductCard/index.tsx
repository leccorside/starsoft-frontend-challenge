'use client';

import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addItem } from '@/store/slices/cartSlice';
import styles from './styles.module.scss';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    }));
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
        <p className={styles.card__price}>
          {product.price} ETH
        </p>
        <button 
          className={styles.card__button}
          onClick={handleAddToCart}
        >
          Comprar
        </button>
      </div>
    </article>
  );
};
