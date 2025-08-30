import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/MainPanel.module.css';


function MainPanel () {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      // Redirecionar para a página de login se não estiver autenticado
      navigate('/login');
    }
  }, [user, navigate, loading]);

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

  if (!user) {
    return null;
  }

  return (
    <div className='styles.container'>
      <h1>Main Panel</h1>

      <div>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  )
}

export default MainPanel;