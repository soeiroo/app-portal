import { useEffect, useState } from 'react';
import styles from '../styles/LoginForm.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';


function LoginRegisterForm (){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const { user, login, register, loading } = useAuth();
  
  
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate('/main');
    }
  }, [user, navigate]);


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


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      

      if (isRegister) {
        await register(email, password);
        setIsRegister(false);
        
      } else {
        await login(email, password);

      }
    } catch (error) {
      console.error('Error during authentication:', error);
      alert('Authentication error: ' + error.message);
    }
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

export default LoginRegisterForm;
