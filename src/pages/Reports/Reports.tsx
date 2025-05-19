import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CustomDatePicker } from "../../components/CustomDatePicker/CustomDatePicker";
import styles from "./Reports.module.css";
import { BsPcDisplay, BsPersonFill } from "react-icons/bs";
import { SiGoogleclassroom } from "react-icons/si";
import { MdOutlineDescription } from "react-icons/md";
import { GrAction } from "react-icons/gr";
import { FaCalendar } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { createReportService } from "../../api/reports.service";


type FormData = {
  reportDate: Date | null;
  reporterName: string;
  role: string;
  room: string;
  pc: string;
  description: string;
  attendant: string;
  actionTaken: string;
};

const rooms = [
  { id: null, name: "Sala" },
  { id: 1, name: 203 },
  { id: 2, name: 204 },
];

const roles = [
  { id: null, name: "Rol" },
  { id: 1, name: "Estudiante" },
  { id: 2, name: "Docente" },
  { id: 3, name: "Encargado" },
];

export default function Reports() {
  const { register, handleSubmit, control } = useForm<FormData>();
  const navigate = useNavigate();

  const selectPlaceholder = (room: {
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

  const onSubmit = (data: FormData) => {
    createReportService(data);
    navigate("/result");
  };

  return (
    <>
      <div className={styles.backButtonContainer}>
        <button className={styles.backButton} onClick={() => navigate("/")}>
          <FaArrowLeftLong />
          <p>Regresar</p>
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h1 className={styles.formTitle}>REPORTE DE FALLA DE MÁQUINA</h1>
        <p>Para reportar la falla, llena el formulario:</p>

        <div className={styles.twoInputsContainer}>
          <div className={styles.inputSmallContainer}>
            <div className={styles.iconContainer}>
              <FaCalendar />
            </div>
            <div className={styles.dateContainer}>
              <Controller
                control={control}
                name="reportDate"
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
            <select {...register("room")} className={styles.formSmallInput}>
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
            <BsPersonFill />
          </div>
          <select {...register("role")} className={styles.formSelectInput} defaultValue={"Rol"}>
            {roles.map((role) => selectPlaceholder(role))}
          </select>
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
            {...register("attendant")}
            placeholder="Nombre de quien atiende"
            className={styles.formInput}
          />
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.iconContainer}>
            <GrAction />
          </div>
          <input
            {...register("actionTaken")}
            placeholder="Acción tomada"
            className={styles.formInput}
          />
        </div>

        <button type="submit" className={styles.formButton}>
          Continuar
        </button>
      </form>
    </>
  );
}
