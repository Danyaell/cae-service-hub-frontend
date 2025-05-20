import { useForm } from "react-hook-form";
import styles from "./Login.module.css";
import { useAuthStrore } from "../../store/login.store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type LoginFormInputs = {
  username: string;
  password: string;
};

export default function Login() {
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const navigate = useNavigate();
  const user = useAuthStrore(state => state.user);
  const login = useAuthStrore(state => state.login);

  const [error, setError] = useState(false);

  const onSubmit = (data: {username: string, password: string}) => {
    if (data.username === "admin" && data.password === "admin") {
      login({ id: 1, name: "Danos", role: "admin" });
      setError(false);
      navigate("/");
    } else {
      setError(true);
    }
  };

  console.log("Login", user);

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <h1>Iniciar Sesión</h1>
        <input
          type="text"
          placeholder="Usuario"
          {...register("username", { required: true })}
        />
        <input
          type="password"
          placeholder="Contraseña"
          {...register("password", { required: true })}
        />
        {error && (
          <p className={styles.errorMessage}>Credenciales incorrectas</p>
        )}
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
}
