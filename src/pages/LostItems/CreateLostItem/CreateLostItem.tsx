import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CustomDatePicker } from "../../../components/CustomDatePicker/CustomDatePicker";
import styles from "./CreateLostItem.module.css";
import { SiGoogleclassroom } from "react-icons/si";
import { MdOutlineDescription } from "react-icons/md";
import { GrAction } from "react-icons/gr";
import { FaCalendar } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useAuthStrore } from "../../../store/login.store";
import { LostItemForm } from "../../../types/lostItem.types";
import { createLostItemService } from "../../../api/lostItems.service";

const rooms = [
  { id: null, name: "" },
  { id: 1, name: 203 },
  { id: 2, name: 204 },
];

export default function CreateLostItem() {
  const user = useAuthStrore((state) => state.user);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LostItemForm>({
    defaultValues: {
      date: new Date(),
      room: "",
      description: "",
      returned: false,
    },
  });

  const selectRoomPlaceholder = (room: {
    id: number | null;
    name: string | number;
  }) => {
    if (room.id === null) {
      return (
        <option key={room.id} value={room.name} disabled hidden>
          Sala
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

  const onSubmit = async (data: LostItemForm) => {
    try {
      await createLostItemService(data);
      navigate(user ? "/lost-items" : "/result", {
        state: {
          success: true,
          message1: "Realizado",
          message2: "Objeto perdido registrado exitosamente.",
          textButton: "Volver al inicio.",
        },
      });
    } catch (error) {
      navigate(user ? "/lost-items" : "/result", {
        state: {
          success: false,
          message1: "ERROR 500",
          message2: "Hubo un error en el servidor.",
          textButton: "Intenta nuevamente.",
        },
      });
    }
  };

  return (
    <>
      <div className={styles.backButtonContainer}>
        <button
          className={styles.backButton}
          onClick={() => navigate(user ? "/lost-items" : "/")}
        >
          <FaArrowLeftLong />
          <p>Regresar</p>
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h1 className={styles.formTitle}>REPORTAR OBJETO PERDIDO</h1>
        <p>Para reportar el objeto perdido, llena el formulario:</p>

        <div className={styles.twoInputsContainer}>
          <div className={styles.inputSmallContainer}>
            <div className={styles.iconContainer}>
              <FaCalendar />
            </div>
            <div className={styles.dateContainer}>
              <Controller
                control={control}
                rules={{ required: "La fecha es obligatoria" }}
                name="date"
                render={({ field }) => (
                  <CustomDatePicker
                    selectedDate={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>
          <div className={styles.inputSmallContainer}>
            <div className={styles.iconContainer}>
              <SiGoogleclassroom />
            </div>
            <select
              {...register("room", { required: "La sala es obligatoria" })}
              className={`${styles.formSmallInput} ${
                errors.room ? styles.inputError : ""
              }`}
            >
              {rooms.map((room) => selectRoomPlaceholder(room))}
            </select>
          </div>
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.iconContainer}>
            <MdOutlineDescription />
          </div>
          <input
            {...register("description", {
              required: "La descripción es obligatoria",
            })}
            placeholder="Descripción del objeto"
            className={`${styles.formInput} ${
              errors.description ? styles.inputError : ""
            }`}
          />
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.iconContainer}>
            <GrAction />
          </div>
          <select {...register("returned")} className={styles.formSelectInput}>
            <option value="false">No regresado</option>
            <option value="true">Regresado</option>
          </select>
        </div>
        <button type="submit" className={styles.formButton}>
          Continuar
        </button>
      </form>
    </>
  );
}
