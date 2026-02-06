import styles from './styles.module.scss';

export const ProductSkeleton = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.skeleton__image} />
      <div className={styles.skeleton__text} />
      <div className={`${styles.skeleton__text} ${styles.skeleton__text__short}`} />
      <div className={styles.skeleton__button} />
    </div>
  );
};
