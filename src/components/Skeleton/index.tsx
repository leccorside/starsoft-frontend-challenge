import styles from './styles.module.scss';

export const ProductSkeleton = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.skeleton__image} />
      <div className={styles.skeleton__text} />
      <div className={`${styles.skeleton__text} ${styles.skeleton__textShort}`} />
      <div className={styles.skeleton__button} />
    </div>
  );
};

export const CartItemSkeleton = () => {
  return (
    <div className={styles.cartSkeleton}>
      <div className={styles.cartSkeleton__image} />
      <div className={styles.cartSkeleton__content}>
        <div className={styles.cartSkeleton__line} />
        <div className={`${styles.cartSkeleton__line} ${styles.cartSkeleton__lineShort}`} />
        <div className={`${styles.cartSkeleton__line} ${styles.cartSkeleton__linePrice}`} />
      </div>
    </div>
  );
};
