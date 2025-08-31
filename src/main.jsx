
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import styles from './styles/MainPanel.module.css';
import App from './App.jsx';
import MainPanel from './pages/MainPanel.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { useAuth } from './context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

export function RedirectOnEntry () {
  const { loading, user } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
    <div className={styles['loader-wrapper']}>
      <div className={styles['newtons-cradle']}>
        <div className={styles['newtons-cradle__dot']}></div>
        <div className={styles['newtons-cradle__dot']}></div>
        <div className={styles['newtons-cradle__dot']}></div>
        <div className={styles['newtons-cradle__dot']}></div>
      </div>
    </div>);
  }

  return (user) ? navigate('/main') : navigate('/login');

}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RedirectOnEntry />} />
          <Route path="/login" element={<App />} />
          <Route path="/main" element={<MainPanel />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
