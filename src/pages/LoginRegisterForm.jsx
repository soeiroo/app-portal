import { useState } from 'react';
import styles from './LoginForm.module.css';
import { Link } from 'react-router-dom';
import { auth } from '../firebase'; // Adjust the import path as necessary
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';


function LoginForm (){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [user, setUser] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        setUser(userCredential.user);
        alert(`Registered with: ${email}, ${password}`);
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setUser(userCredential.user);
        alert(`Logged in with: ${email}, ${password}`);
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      alert('Authentication error: ' + error.message);
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      alert('Você deslogou com sucesso.');
    } catch (error) {
      console.error('Error during logout:', error);
      alert('Logout error:', error.message);
    }
  }

  if (user) {
    return (
      <div className={styles.container}>
        <div className={styles['login-box']}>
          <h2 className={styles['login-title']}>Welcome, {user.email}</h2>
          <button onClick={handleLogout} className={styles['logout-button']}>Logout</button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles['login-box']}>
        <h2 className={styles['login-title']}>{isRegister ? "Criar Conta" : "Login"}</h2>
        <div className={styles['input-group']}>
          <label htmlFor='email'>Email:</label>
          <input 
            type='email' 
            id='email' 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            className={styles['input']}
          />
        </div>
        <div className={styles['input-group']}>
          <label htmlFor='password'>Password:</label>
          <input 
            type='password' 
            id='password' 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            className={styles['input']}
          />
        </div>
        <button type='submit' className={styles['login-button']}>
          {isRegister ? "Cadastrar" : "Entrar"}
        </button>
        <p className={styles['signup-text']}>
          {isRegister ? "Já tem uma conta?" : "Não tem uma conta?"}{" "}
          <span onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "Entrar" : "Cadastrar"}
          </span>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
