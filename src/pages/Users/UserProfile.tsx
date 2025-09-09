import styles from "./UserProfile.module.css";
import { useAuthStrore } from "../../store/login.store";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import {
  deleteUserService,
  getUserByIdService,
  updateUserService,
} from "../../api/users.service";
import { User, UserForm } from "../../types/user.types";
import { useForm } from "react-hook-form";
import { ConfirmModal } from "../../components/ConfirmationModal/ConfirmationModal";

export default function UserProfile() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const logout = useAuthStrore((state) => state.logout);
  const { id } = useParams<{ id: string }>();
  const [userInfo, setUserInfo] = useState<User>();
  const [isEditing, setIsEditing] = useState(false);
  const loading = useAuthStrore((state) => state.loading);
  const { register, handleSubmit, setValue } = useForm<UserForm>({
    defaultValues: {
      name: userInfo?.name ? userInfo.name : "",
      password: "",
      role: userInfo?.role ? userInfo.role : "Rol",
    },
  });

  const roles = [
    { id: null, name: "Rol" },
    { id: 1, name: "Estudiante" },
    { id: 2, name: "Docente" },
    { id: 3, name: "Encargado" },
  ];

  const onSubmit = async (data: UserForm) => {
    try {
      if (id) {
        console.log(data);
        await updateUserService(parseInt(id), data).then((data) => {
          setUserInfo(data);
        });
      }
    } catch (error) {}
  };

  const toggleIsEditing = () => {
    setIsEditing(!isEditing);
  };

  const confirmDelete = async () => {
    if (id) {
      try {
        await deleteUserService(parseInt(id));
        logout();
        navigate("/");
      } catch (err) {
        console.error("Error eliminando usuario", err);
      } finally {
        setIsModalOpen(false);
      }
    }
  };

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
    if (id) {
      getUserByIdService(parseInt(id))
        .then((data) => {
          setUserInfo(data);
        })
        .catch((error) => {});
    }
  }, [id]);

  useEffect(() => {
    if (userInfo) {
      setValue("name", userInfo.name);
      setValue("role", userInfo.role);
    }
  }, [userInfo, setValue]);

  /*   useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user]) */

  return (
    <>
      <div className={styles.loginContainer}>
        <div className={styles.backButtonContainer}>
          <button className={styles.backButton} onClick={() => navigate("/")}>
            <FaArrowLeftLong />
            <p>Regresar</p>
          </button>
        </div>

        <div className={styles.editContainer}>
          <div className={styles.headContainer}>
            <div className={styles.titleContainer}>
              <h1 className={styles.title}>Usuario {userInfo?.name}</h1>
              <h2 className={styles.subtitle}>ID #{userInfo?.id}</h2>
            </div>
            <div className={styles.buttonContainer}>
              <button className={styles.button} onClick={toggleIsEditing}>
                Editar
              </button>
            </div>
          </div>
          <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.infoContainer}>
              <div className={styles.rowContainer}>
                <div className={styles.labelContainer}>Nombre de usuario:</div>
                {(!isEditing && (
                  <div className={styles.valueContainer}>
                    <p className={styles.value}>{userInfo?.name}</p>
                  </div>
                )) || (
                  <div className={styles.inputValueContainer}>
                    <input
                      {...register("name")}
                      type="text"
                      placeholder="Usuario"
                      className={styles.inputValue}
                      defaultValue={userInfo?.name}
                    />
                  </div>
                )}
              </div>
              {isEditing && (
                <div className={styles.rowContainer}>
                  <div className={styles.labelContainer}>Contraseña:</div>
                  <div className={styles.inputValueContainer}>
                    <input
                      {...register("password")}
                      type="password"
                      placeholder="Contraseña nueva"
                      className={styles.inputValue}
                    />
                  </div>
                </div>
              )}
              <div className={styles.rowContainer}>
                <div className={styles.labelContainer}>Rol:</div>
                {(!isEditing && (
                  <div className={styles.valueContainer}>
                    <p className={styles.value}>{userInfo?.role}</p>
                  </div>
                )) || (
                  <div className={styles.inputValueContainer}>
                    <select
                      {...register("role")}
                      className={styles.inputValue}
                      defaultValue={"Rol"}
                    >
                      {roles.map((role) => selectRolPlaceholder(role))}
                    </select>
                  </div>
                )}
              </div>
              <div className={styles.rowContainer}>
                <div className={styles.labelContainer}>Creado el:</div>
                <div className={styles.valueContainer}>
                  <p className={styles.value}>
                    {userInfo?.created_at
                      ? new Date(userInfo.created_at)
                          .toLocaleDateString("es-MX", {
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                          })
                          .toUpperCase()
                      : ""}
                  </p>
                </div>
              </div>
              <div className={styles.rowContainer}>
                <div className={styles.labelContainer}>Última edición:</div>
                <div className={styles.valueContainer}>
                  <p className={styles.value}>
                    {userInfo?.updated_at
                      ? new Date(userInfo.updated_at)
                          .toLocaleDateString("es-MX", {
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                          })
                          .toUpperCase()
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
            {isEditing && (
              <div className={styles.arrayButtons}>
                <button onClick={() => setIsModalOpen(true)} className={styles.deleteUserButton}>
                  {loading ? "Cargando" : "Eliminar usuario"}
                </button>
                <button type="submit" className={styles.formButton}>
                  {loading ? "Cargando" : "Actualizar"}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
      <ConfirmModal
        isOpen={isModalOpen}
        onConfirm={confirmDelete}
        onCancel={() => setIsModalOpen(false)}
        message="¿Seguro que quieres eliminar este objeto?"
      />
    </>
  );
}
