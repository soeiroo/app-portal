import { useEffect, useState } from 'react';
import styles from '../styles/LoginForm.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';


function LoginRegisterForm (){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const { user, login, register, loading, resetPassword } = useAuth();
  
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
  };

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(resetEmail);
      alert('E-mail de reset enviado!');
      setShowReset(false);
      setResetEmail('');
    } catch (error) {
      alert('Erro ao enviar e-mail de reset: ' + error.message);
    }
  };

  return (
    <div className={styles.container}>
      {!showReset ? (
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
          <p className={styles['signup-text']}>
            <span onClick={() => setShowReset(true)}>Esqueceu a senha?</span>
          </p>
        </form>
      ) : (
        <form onSubmit={handleReset} className={styles['login-box']}>
          <h2 className={styles['login-title']}>Resetar senha</h2>
          <div className={styles['input-group']}>
            <label htmlFor='resetEmail'>Digite seu e-mail:</label>
            <input
              type='email'
              id='resetEmail'
              value={resetEmail}
              onChange={e => setResetEmail(e.target.value)}
              required
              className={styles['input']}
            />
          </div>
          <button type='submit' className={styles['login-button']}>
            Enviar e-mail de reset
          </button>
          <p className={styles['signup-text']}>
            <span onClick={() => setShowReset(false)}>Voltar para login</span>
          </p>
        </form>
      )}
    </div>
  );
}

export default LoginRegisterForm;
