import { useState } from 'react';
import styles from '../styles/NavPanel.module.css';
import { useAuth } from '../context/AuthContext.jsx';

export function NavPanel({ onSelect }) {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const handleClick = (name) => {
    if (onSelect) onSelect(name);
  };

  return (
    <nav className={styles.nav}>
      {/* Lado esquerdo */}
      <div className={styles.navLeft}>
        <button
          className={styles.link}
          onClick={() => handleClick('Documentação')}
        >
          Documentação
        </button>
        <button
          className={styles.link}
          onClick={() => handleClick('Menu')}
        >
          Menu
        </button>
      </div>

      {/* Lado direito */}
      <div className={styles.navRight}>
        <div
          className={styles.popup}
          onClick={() => setOpen(!open)}
        >
          <div className={styles.popupHeader}>
            <div className={styles.userBox}>
              <p className={styles.userName}>{user?.email || 'Usuário'}</p>

              {/* Avatar SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 24 24"
                className={styles.avatar}
              >
                <circle cx="12" cy="12" r="12" fill="#2d2d2d" />
                <circle cx="12" cy="8" r="4" fill="#ffffff" />
                <path
                  d="M12 14c-4.5 0-8 2-8 5v1h16v-1c0-3-3.5-5-8-5z"
                  fill="#ffffff"
                />
              </svg>
            </div>
          </div>

          <div className={`${styles.popupMain} ${open ? styles.popupOpen : ''}`}>
            <ul className={styles.listBox}>
              <li className={styles.item}>Mix Mateus</li>
              <hr />
              <li className={styles.item}>Setting</li>
              <hr />
              <li
                onClick={logout}
                className={`${styles.item} ${styles.quit}`}
              >
                Quit
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
