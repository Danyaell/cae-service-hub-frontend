import styles from "./Login.module.css";
import { useAuthStrore } from "../../store/login.store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { BsPersonFill } from "react-icons/bs";
import { TbPassword } from "react-icons/tb";

/* type LoginFormInputs = {
  username: string;
  password: string;
}; */

export default function Login() {
  //const { register, handleSubmit } = useForm<LoginFormInputs>();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const login = useAuthStrore(state => state.login);
  const error = useAuthStrore(state => state.error);
  const loading = useAuthStrore(state => state.loading);
  const user = useAuthStrore(state => state.user);
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await login(name, password);
  };

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user])
  

  return (
    <div className={styles.loginContainer}>
      <div className={styles.backButtonContainer}>
        <button
          className={styles.backButton}
          onClick={() => (user ? navigate("/requests") : navigate("/"))}
        >
          <FaArrowLeftLong />
          <p>Regresar</p>
        </button>
      </div>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h1 className={styles.formTitle}>INICIAR SESIÓN</h1>
        <div className={styles.inputContainer}>
          <div className={styles.iconContainer}>
            <BsPersonFill />
          </div>
          <input
            type="text"
            placeholder="Usuario"
            className={styles.formInput}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.iconContainer}>
            <TbPassword />
          </div>
          <input
            type="password"
            placeholder="Contraseña"
            className={styles.formInput}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        {error && (
          <p className={styles.errorMessage}>Credenciales incorrectas</p>
        )}
        <button type="submit" className={styles.formButton}>
          {loading ? 'Cargando' : 'Iniciar Sesión'}
        </button>
      </form>
    </div>
  );
}
