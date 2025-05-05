import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CustomDatePicker } from "../../components/CustomDatePicker/CustomDatePicker";
import styles from "./Reports.module.css";
import { BsPcDisplay, BsPersonFill } from "react-icons/bs";
import { SiGoogleclassroom } from "react-icons/si";
import { MdOutlineDescription } from "react-icons/md";
import { GrAction } from "react-icons/gr";
import { FaCalendar } from "react-icons/fa";

type FormData = {
  sala: string;
  pc: string;
  date: Date | null;
  reporterName: string;
  description: string;
  asignee: string;
  action: string;
};

const rooms = [
  { id: null, name: "Sala" },
  { id: 1, name: 203 },
  { id: 2, name: 204 },];

export default function Reports() {
  const { register, handleSubmit, control } = useForm<FormData>();
  const navigate = useNavigate();

  const selectPlaceholder = (room: { id: number | null; name: string | number }) => {
    if (room.id === null) {
      return <option key={room.id} value={room.name} disabled selected hidden>{room.name}</option>;
    } else {
      return <option className={styles.roomOptions} key={room.id} value={room.name}>{room.name}</option>;
    }
  };

  const onSubmit = (data: FormData) => {
    console.log("Datos enviados:", data);
    navigate("/result");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h1>REPORTE DE FALLA DE MÁQUINA</h1>
      <p>Para reportar la falla, llena el formulario:</p>

      <div className={styles.twoInputsContainer}>
        <div className={styles.inputSmallContainer}>
          <div className={styles.iconContainer}>
            <FaCalendar />
          </div>
          <div className={styles.dateContainer}>
            <Controller
              control={control}
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
          <select {...register("sala")} className={styles.formSmallInput}  >
            {rooms.map((room) => selectPlaceholder(room))}
          </select>
        </div>
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.iconContainer}>
          <BsPersonFill />
        </div>
        <input
          {...register("reporterName")}
          placeholder="Nombre de quien reporta"
          className={styles.formInput}
        />
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.iconContainer}>
          <BsPcDisplay />
        </div>
        <input
          {...register("pc")}
          type="number"
          placeholder="PC"
          className={styles.formInput}
        />
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.iconContainer}>
          <MdOutlineDescription />
        </div>
        <input
          {...register("description")}
          placeholder="Descripción de la falla"
          className={styles.formInput}
        />
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.iconContainer}>
          <BsPersonFill />
        </div>
        <input
          {...register("asignee")}
          placeholder="Nombre de quien atiende"
          className={styles.formInput}
        />
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.iconContainer}>
          <GrAction />
        </div>
        <input
          {...register("action")}
          placeholder="Acción tomada"
          className={styles.formInput}
        />
      </div>

      <button type="submit" className={styles.formButton}>
        Continuar
      </button>
    </form>
  );
}
