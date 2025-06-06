import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CustomDatePicker } from "../../components/CustomDatePicker/CustomDatePicker";
import styles from "./CreateRequest.module.css";
import { FaCalendar } from "react-icons/fa";
import { BsPersonFill } from "react-icons/bs";
import { SiGoogleclassroom } from "react-icons/si";
import { MdOutlineHomeRepairService } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";
import { createSoftwareRequestService } from "../../api/softwareRequests.service";
import { useAuthStrore } from "../../store/login.store";
import { Attendant } from "../../types/user.types";
import { useEffect, useState } from "react";
import { getUsersService } from "../../api/users.service";

type FormData = {
  requestDate: Date | null;
  requestorName: string;
  room: string;
  software: string;
  attendantId: number;
  commitmentDate: Date | null;
  status: "pending" | "in_progres" | "needs_attention" | "completed" | "cancelled";
};

const rooms = [
  { id: null, name: "Sala" },
  { id: 1, name: 203 },
  { id: 2, name: 204 },
];

export default function CreateRequest() {
  const user = useAuthStrore((state) => state.user);
  const [attendants, setAttendants] = useState<Attendant[]>([]);
  const { register, handleSubmit, control, setValue } = useForm<FormData>({
    defaultValues: {
      requestDate: new Date(),
      requestorName: "",
      room: "Sala",
      software: "",
      attendantId: user ? user.id : -1,
      commitmentDate: null,
      status: "pending",
    },
  });
  const navigate = useNavigate();

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

  const selectUserPlaceholder = (user: Attendant) => {
    return (
      <option className={styles.roomOptions} key={user.id} value={user.id}>
        {user.name}
      </option>
    );
  };

  const onSubmit = (data: FormData) => {
    createSoftwareRequestService(data);
    navigate("/result");
  };

  return (
    <>
      <div className={styles.backButtonContainer}>
        <button className={styles.backButton} onClick={() => user ? navigate("/requests") : navigate("/")}>
          <FaArrowLeftLong />
          <p>Regresar</p>
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h1 className={styles.formTitle}>
          SOLICITUD DE INSTALACIÓN DE SOFTWARE
        </h1>
        <p>Para solicitar la instalación de software, llena el formulario:</p>

        <div className={styles.twoInputsContainer}>
          <div className={styles.inputSmallContainer}>
            <div className={styles.iconContainer}>
              <FaCalendar />
            </div>
            <div className={styles.dateContainer}>
              <Controller
                control={control}
                name="requestDate"
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
            <select {...register("room")} className={styles.formSmallInput} defaultValue={"Sala"}>
              {rooms.map((room) => selectPlaceholder(room))}
            </select>
          </div>
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.iconContainer}>
            <BsPersonFill />
          </div>
          <input
            {...register("requestorName")}
            placeholder="Nombre de quien solicita"
            className={styles.formInput}
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
            <MdOutlineHomeRepairService />
          </div>
          <textarea
            {...register("software")}
            placeholder="Servicio que solicita"
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
