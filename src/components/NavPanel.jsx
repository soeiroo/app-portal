import styles from '../styles/NavPanel.module.css';


export function NavPanel() {
  return (
    <nav className={styles['nav']}>
      <ul className={styles['nav-list']}>
        <li>Documentação</li>
        <li></li>
        <li>Minha conta</li>
      </ul>
    </nav>
  );
}