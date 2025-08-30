import React from 'react';
import LoginRegisterForm from './pages/LoginRegisterForm.jsx';
import './App.css';
import { useAuth } from './context/AuthContext.jsx';
import styles from './styles/MainPanel.module.css';

function App() {
  const { loading } = useAuth();

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

  return (
    <div className='app'>
      <LoginRegisterForm />
    </div>
  );
}

export default App
