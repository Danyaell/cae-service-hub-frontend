import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CustomDatePicker } from "../../../components/CustomDatePicker/CustomDatePicker";
import styles from "./CreateReport.module.css";
import { BsPcDisplay, BsPersonFill } from "react-icons/bs";
import { SiGoogleclassroom } from "react-icons/si";
import { MdOutlineDescription } from "react-icons/md";
import { GrAction } from "react-icons/gr";
import { FaCalendar } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { createReportService } from "../../../api/reports.service";
import { useAuthStrore } from "../../../store/login.store";
import { Attendant } from "../../../types/user.types";
import { getUsersService } from "../../../api/users.service";
import { useEffect, useState } from "react";
import { ReportForm } from "../../../types/report.types";

const rooms = [
  { id: null, name: "" },
  { id: 1, name: 203 },
  { id: 2, name: 204 },
];

const roles = [
  { id: null, name: "Rol" },
  { id: 1, name: "Estudiante" },
  { id: 2, name: "Docente" },
  { id: 3, name: "Encargado" },
];

export default function CreateReport() {
  const user = useAuthStrore((state) => state.user);
  const [attendants, setAttendants] = useState<Attendant[]>([]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<ReportForm>({
    defaultValues: {
      reportDate: new Date(),
      reporterName: "",
      role: "Rol",
      room: "",
      pc: "",
      description: "",
      attendantId: -1,
      actionTaken: "",
      status: "pending",
    },
  });

  useEffect(() => {
    if (user && attendants.length > 0) {
      setValue("attendantId", user.id);
    }
  }, [user, attendants, setValue]);

  useEffect(() => {
    getUsersService()
      .then(setAttendants)
      .catch((error) => console.log(error));
  }, []);

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

  const selectUserPlaceholder = (user: Attendant) => {
    return (
      <option className={styles.roomOptions} key={user.id} value={user.id}>
        {user.name}
      </option>
    );
  };

  const onSubmit = async (data: ReportForm) => {
    try {
      await createReportService(data);
      navigate(user ? "/reports" : "/result", {
        state: {
          success: true,
          message1: "Realizado",
          message2: "Reporte creado exitosamente.",
          textButton: "Volver al inicio.",
        },
      });
    } catch (error) {
      navigate(user ? "/reports" : "/result", {
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
          onClick={() => navigate(user ? "/reports" : "/")}
        >
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
                rules={{ required: "La fecha es obligatoria" }}
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
          <select
            {...register("role")}
            className={styles.formSelectInput}
            defaultValue={"Rol"}
          >
            {roles.map((role) => selectRolPlaceholder(role))}
          </select>
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.iconContainer}>
            <BsPcDisplay />
          </div>
          <input
            {...register("pc", { required: "El número de PC es obligatorio" })}
            type="number"
            placeholder="PC"
            className={`${styles.formInput} ${
              errors.pc ? styles.inputError : ""
            }`}
          />
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.iconContainer}>
            <MdOutlineDescription />
          </div>
          <input
            {...register("description", {
              required: "La descripción es obligatoria",
            })}
            placeholder="Descripción de la falla"
            className={`${styles.formInput} ${
              errors.description ? styles.inputError : ""
            }`}
          />
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.iconContainer}>
            <BsPersonFill />
          </div>
          <select
            {...register("attendantId")}
            className={styles.formSelectInput}
            defaultValue={-1}
          >
            <option key={null} value={-1} disabled hidden>
              Nombre de quien atiende
            </option>
            {attendants.map((attendant) => selectUserPlaceholder(attendant))}
          </select>
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.iconContainerLongText}>
            <GrAction />
          </div>
          <textarea
            {...register("actionTaken")}
            placeholder="Acción tomada"
            className={styles.formInputLongText}
          />
        </div>
        <button type="submit" className={styles.formButton}>
          Continuar
        </button>
      </form>
    </>
  );
}
