import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CustomDatePicker } from "../../components/CustomDatePicker/CustomDatePicker";
import styles from "./Requests.module.css";
import { FaCalendar } from "react-icons/fa";
import { BsPersonFill } from "react-icons/bs";
import { SiGoogleclassroom } from "react-icons/si";
import { MdOutlineHomeRepairService } from "react-icons/md";

type FormData = {
  date: Date | null;
  requesterName: string;
  sala: string;
  serviceRequested: string;
  attendant: string;
  commitmentDate: Date | null;
};

const rooms = [
  { id: null, name: "Sala" },
  { id: 1, name: 203 },
  { id: 2, name: 204 },
];

export default function Requests() {
  const { register, handleSubmit, control } = useForm<FormData>();
  const navigate = useNavigate();

  const selectPlaceholder = (room: {
    id: number | null;
    name: string | number;
  }) => {
    if (room.id === null) {
      return (
        <option key={room.id} value={room.name} disabled selected hidden>
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
    console.log("Datos enviados:", data);
    navigate("/result");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h1>SOLICITUD DE INSTALACIÓN DE SOFTWARE</h1>
      <p>Para solicitar la instalación de software, llena el formulario:</p>

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
          <select {...register("sala")} className={styles.formSmallInput}>
            {rooms.map((room) => selectPlaceholder(room))}
          </select>
        </div>
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.iconContainer}>
          <BsPersonFill />
        </div>
        <input
          {...register("requesterName")}
          placeholder="Nombre de quien solicita"
          className={styles.formInput}
        />
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.iconContainer}>
          <MdOutlineHomeRepairService />
        </div>
        <input
          {...register("serviceRequested")}
          type="text"
          placeholder="Servicio que solicita"
          className={styles.formInput}
        />
      </div>
      {/* <div className={styles.inputContainer}>
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
          <FaCalendar />
        </div>
        <div className={styles.dateContainer}>
          <Controller
            control={control}
            name="commitmentDate"
            render={({ field }) => (
              <CustomDatePicker
                selectedDate={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </div> */}

      <button type="submit" className={styles.formButton}>
        Continuar
      </button>
    </form>
  );
}
