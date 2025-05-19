import { useForm } from "react-hook-form";
import styles from "./Login.module.css";

export default function Login() {
  const { register, handleSubmit } = useForm();
  //const navigate = useNavigate();
  //const { login } = useLoginStrore();
  //const [error, setError] = useState(false);

  /* const onSubmit = (data: any) => {
    if (data.username === "admin" && data.password === "admin") {
      login({ id: 1, name: "Admin" });
      navigate("/home");
    } else {
      setError(true);
    }
  }; */

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={() => {}}>
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
        {/* {error && (
          <p className={styles.errorMessage}>Credenciales incorrectas</p>
        )} */}
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
}
