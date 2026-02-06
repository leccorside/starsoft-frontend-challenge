'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { toggleCart } from '@/store/slices/cartSlice';
import styles from './styles.module.scss';

export const Header = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Link href="/" className={styles.header__logo}>
          <div className={styles.header__logoWrapper}>
            <Image 
              src="/assets/logo.png" 
              alt="Starsoft" 
              fill
              sizes="(max-width: 768px) 150px, 200px"
              priority
            />
          </div>
        </Link>
        
        <button 
          className={styles.header__cart}
          onClick={() => dispatch(toggleCart())}
          aria-label={`Carrinho com ${totalItems} itens`}
        >
          <ShoppingBag size={24} color="#FF8310" />
          <span>{totalItems}</span>
        </button>
      </div>
    </header>
  );
};
