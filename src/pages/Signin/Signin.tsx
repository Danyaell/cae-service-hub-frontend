import styles from "./Signin.module.css";
import { useAuthStrore } from "../../store/login.store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { BsPersonFill } from "react-icons/bs";
import { TbPassword } from "react-icons/tb";
import { useForm } from "react-hook-form";
import { SigninForm } from "../../types/login.types";
import { signinService } from "../../api/login.service";

const roles = [
  { id: null, name: "Rol" },
  { id: 1, name: "Estudiante" },
  { id: 2, name: "Docente" },
  { id: 3, name: "Encargado" },
];

export default function Signin() {
  const navigate = useNavigate();

  const login = useAuthStrore((state) => state.login);
  const errorLogin = useAuthStrore((state) => state.error);
  const loading = useAuthStrore((state) => state.loading);
  const user = useAuthStrore((state) => state.user);
  const [error, setError] = useState("");

  const { register, handleSubmit } = useForm<SigninForm>({
    defaultValues: {
      name: "",
      password: "",
      role: "Rol",
    },
  });

  const selectRolPlaceholder = (room: {
    id: number | null;
    name: string | number;
  }) => {
    if (room.id === null) {
      return (
        <option key={room.id} value={room.name} disabled hidden>
          {room.name}
        </option>
      );
    } else {
      return (
        <option className={styles.roomOptions} key={room.id} value={room.name}>
          {room.name}
        </option>
      );
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const onSubmit = async (data: SigninForm) => {
    try {
      if (data.name && data.password && data.role !== "Rol") {
        await signinService(data).then(async () => {
          await login(data.name, data.password);
        });
      } else {
        setError("Por favor, llene el formulario.");
      }
    } catch {
      errorLogin
        ? setError(
            "Ha ocurrido un error al iniciar sesión. Inténtelo de nuevo."
          )
        : setError(
            "Ha ocurrido un error al crear al usuario. Por favor, inténtelo de nuevo."
          );
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.backButtonContainer}>
        <button
          className={styles.backButton}
          onClick={() => (user ? navigate("/requests") : navigate("/login"))}
        >
          <FaArrowLeftLong />
          <p>Regresar</p>
        </button>
      </div>
      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.formTitle}>CREAR USUARIO</h1>
        {(error || errorLogin) && (
          <div className={styles.errorBanner}>{error || errorLogin}</div>
        )}
        <div className={styles.inputContainer}>
          <div className={styles.iconContainer}>
            <BsPersonFill />
          </div>
          <input
            {...register("name")}
            type="text"
            placeholder="Usuario"
            className={styles.formInput}
          />
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.iconContainer}>
            <TbPassword />
          </div>
          <input
            {...register("password")}
            type="password"
            placeholder="Contraseña"
            className={styles.formInput}
          />
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.iconContainer}>
            <BsPersonFill />
          </div>
          <select
            {...register("role")}
            className={styles.formSelectInput}
            defaultValue={"Rol"}
          >
            {roles.map((role) => selectRolPlaceholder(role))}
          </select>
        </div>
        <button type="submit" className={styles.formButton}>
          {loading ? "Cargando" : "Confirmar"}
        </button>
      </form>
    </div>
  );
}
