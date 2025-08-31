import { useState, useEffect } from 'react';
import styles from '../styles/ShowContentButton.module.css';

export function ShowContentButton ({ label, children }) {
  const [loading, setLoading] = useState(false);
  const [showContent, setShowContent] = useState(false);

  if (loading) {
    return (
      <div className={styles['loader-wrapper']}>
        <div className={styles['newtons-cradle']}>
          <div className={styles['newtons-cradle__dot']}></div>
          <div className={styles['newtons-cradle__dot']}></div>
          <div className={styles['newtons-cradle__dot']}></div>
          <div className={styles['newtons-cradle__dot']}></div>
        </div>
      </div>
    );
  }

  const handleClick = () => {
    setLoading(true);
    setShowContent(!showContent);
    setTimeout(() => {
      setLoading(false);
    }, 100);
  };
  return (
    <div>
      <button className={styles.button} onClick={handleClick}>
        {label}
      </button>
      {showContent && (
        <div className={styles.content}>
          {children}
        </div>
      )}
    </div>
  );
}