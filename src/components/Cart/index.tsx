'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trash2, Minus, Plus } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { toggleCart, removeItem, updateQuantity } from '@/store/slices/cartSlice';
import styles from './styles.module.scss';

export const Cart = () => {
  const dispatch = useAppDispatch();
  const { items, isOpen } = useAppSelector((state) => state.cart);
  const [isCheckout, setIsCheckout] = useState(false);

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const formattedTotal = Math.floor(total);

  const handleCheckout = () => {
    setIsCheckout(true);
    setTimeout(() => {
      setIsCheckout(false);
    }, 3000);
  };

  const handleQuantityChange = (id: number, currentQuantity: number, change: number) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity >= 1) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  // Truncate description to 23 characters
  const truncateDescription = (text: string) => {
    if (!text) return '';
    if (text.length <= 26) return text;
    return text.substring(0, 26) + '...';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.backdrop}
            onClick={() => dispatch(toggleCart())}
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={styles.cart}
          >
            <header className={styles.cart__header}>
              <button className={styles.cart__backButton} onClick={() => dispatch(toggleCart())}>
                <ArrowLeft size={20} />
              </button>
              <h2 className={styles.cart__title}>Mochila de Compras</h2>
            </header>

            <div className={styles.cart__items}>
              {items.length === 0 ? (
                <div className={styles.cart__empty}>Sua mochila está vazia</div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className={styles.item}>
                    <div className={styles.item__image}>
                      <Image src={item.image} alt={item.name} fill sizes="35%" />
                    </div>

                    <div className={styles.item__details}>
                      <div className={styles.item__info}>
                        <h3 className={styles.item__name}>{item.name}</h3>
                        <p className={styles.item__description}>
                          {truncateDescription(
                            item.description || 'Redesigned from scratch and completely revised.'
                          )}
                        </p>

                        <div className={styles.item__price}>
                          <Image src="/assets/eth-icon.png" alt="ETH" width={16} height={16} />
                          {Math.floor(item.price)} ETH
                        </div>

                        <div className={styles.item__quantity}>
                          <button onClick={() => handleQuantityChange(item.id, item.quantity, -1)}>
                            <Minus size={14} />
                          </button>
                          <span>{item.quantity}</span>
                          <button onClick={() => handleQuantityChange(item.id, item.quantity, 1)}>
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>

                      <button
                        className={styles.item__remove}
                        onClick={() => dispatch(removeItem(item.id))}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <footer className={styles.cart__footer}>
              <div className={styles.cart__total}>
                <span>TOTAL</span>
                <span>
                  <Image src="/assets/eth-icon.png" alt="ETH" width={24} height={24} />
                  {formattedTotal} ETH
                </span>
              </div>

              <button
                className={styles.cart__checkoutButton}
                onClick={handleCheckout}
                disabled={items.length === 0}
              >
                {isCheckout ? 'Compra Finalizada!' : 'Finalizar Compra'}
              </button>
            </footer>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
