// MainPanel.jsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/MainPanel.module.css';
import { NavPanel } from '../components/NavPanel';

function MainPanel() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false); // Loader local
  const [content, setContent] = useState(''); // Conteúdo do botão selecionado

  const handleSelect = (name) => {
    setLoading(true);      // Mostra loader
    setContent('');        // Limpa conteúdo antigo

    // Simula delay de carregamento
    setTimeout(() => {
      setLoading(false);   // Esconde loader
      setContent(name);    // Exibe conteúdo do botão
    }, 1000); // 1s de delay
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className={styles.container}>
      <section className={styles.navpanel}>
        <NavPanel onSelect={handleSelect} />
      </section>

      <section className={styles.mainpanel}>
        {loading && (
          <div className={styles['loader-wrapper']}>
            <div className={styles['newtons-cradle']}>
              <div className={styles['newtons-cradle__dot']}></div>
              <div className={styles['newtons-cradle__dot']}></div>
              <div className={styles['newtons-cradle__dot']}></div>
              <div className={styles['newtons-cradle__dot']}></div>
            </div>
          </div>
        )}

        {!loading && content && (
          <div>
            <h2>{content}</h2>
            <p>Conteúdo de {content} aparece aqui.</p>
          </div>
        )}

        {!loading && !content && <h1>Painel CPD</h1>}
      </section>
    </div>
  );
}

export default MainPanel;
