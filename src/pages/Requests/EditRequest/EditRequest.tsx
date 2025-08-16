import { useEffect, useState } from "react";
import styles from "./EditRequest.module.css";
import { Attendant } from "../../../types/user.types";
import { useAuthStrore } from "../../../store/login.store";
import { useNavigate, useParams } from "react-router-dom";
import {
  SoftwareRequest,
  SoftwareRequestForm,
} from "../../../types/softwareRequest.types";
import { Controller, useForm } from "react-hook-form";
import { getUsersService } from "../../../api/users.service";
import {
  editSoftwareRequestService,
  getSoftwareRequestByIdService,
} from "../../../api/softwareRequests.service";
import { FaArrowLeftLong } from "react-icons/fa6";
import { BsPersonFill } from "react-icons/bs";
import { GrAction } from "react-icons/gr";
import { FaRegCircle } from "react-icons/fa";
import { CustomDatePicker } from "../../../components/CustomDatePicker/CustomDatePicker";

export default function EditRequest() {
  const user = useAuthStrore((state) => state.user);
  const [attendants, setAttendants] = useState<Attendant[]>([]);
  const [selectedStatus, setSelectedStatus] =
    useState<keyof typeof statusClassMap>("pending");
  const statusTypes = [
    { id: "pending", name: "PENDIENTE" },
    { id: "in_progress", name: "EN PROGRESO" },
    { id: "needs_attention", name: "ATENCIÓN" },
    { id: "completed", name: "COMPLETADO" },
    { id: "cancelled", name: "CANCELADO" },
  ];
  const [request, setRequest] = useState<SoftwareRequest>();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { register, handleSubmit, control, setValue } =
    useForm<SoftwareRequestForm>({
      defaultValues: {
        requestDate: request?.request_date,
        requestorName: request?.requestor_name,
        room: request?.room,
        software: request?.software,
        //attendantId: request?.attendant_id,
        commitmentDate: request?.commitment_date,
        status: request?.status,
      },
    });

  const statusClassMap = {
    pending: styles.pending,
    in_progress: styles.inProgress,
    needs_attention: styles.needsAttention,
    completed: styles.completed,
    cancelled: styles.cancelled,
  };

  useEffect(() => {
    if (user && attendants.length > 0 && !request?.attendant_id) {
      setValue("attendantId", user.id);
    }
    if (request) {
      setValue("requestDate", new Date(request.request_date));
      setValue("requestorName", request.requestor_name);
      setValue("room", request.room);
      setValue("software", request.software);
      setValue("attendantId", request.attendant_id ?? user?.id ?? -1);
      setValue("commitmentDate", request.commitment_date);
      setValue("status", request.status);
    }
  }, [request, user, attendants, setValue]);

  useEffect(() => {
    getUsersService()
      .then(setAttendants)
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (id) {
      getSoftwareRequestByIdService(parseInt(id))
        .then((data) => {
          setRequest(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  useEffect(() => {
    if (request?.status) {
      setSelectedStatus(request.status);
    }
  }, [request]);

  const selectUserPlaceholder = (user: Attendant) => {
    return (
      <option className={styles.roomOptions} key={user.id} value={user.id}>
        {user.name}
      </option>
    );
  };

  const selectStatusPlaceholder = (status: { id: string; name: string }) => {
    return (
      <option
        className={styles.statusOptions}
        key={status.id}
        value={status.id}
      >
        {status.name}
      </option>
    );
  };

  const onSubmit = async (data: SoftwareRequestForm) => {
    try {
      await editSoftwareRequestService(data, parseInt(id!));
      navigate(user ? "/requests" : "/result", {
        state: {
          success: true,
          message1: "Realizado",
          message2: "Solicitud editada exitosamente.",
          textButton: "Volver al inicio.",
        },
      });
    } catch (error) {
      navigate(user ? "/requests" : "/result", {
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
          onClick={() => navigate(user ? "/requests" : "/")}
        >
          <FaArrowLeftLong />
          <p>Regresar</p>
        </button>
      </div>
      <div className={styles.editContainer}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Solicitud #{request?.id}</h1>
        </div>
        <div className={styles.container}>
          <div className={styles.infoContainer}>
            <table className={styles.table}>
              <tbody>
                <tr className={styles.rowData}>
                  <td className={styles.cellData}>Fecha de la Solicitud</td>
                  <td className={styles.cellData}>
                    {request?.request_date
                      ? new Date(request?.request_date).toLocaleDateString(
                          "es-MX",
                          {
                            year: "numeric",
                            month: "long",
                            day: "2-digit",
                          }
                        )
                      : ""}
                  </td>
                </tr>
                <tr>
                  <td className={styles.cellData}>Solicitado por</td>
                  <td className={styles.cellData}>{request?.requestor_name}</td>
                </tr>
                <tr>
                  <td className={styles.cellData}>Aula</td>
                  <td className={styles.cellData}>{request?.room}</td>
                </tr>
                <tr>
                  <td className={styles.cellData}>Software</td>
                  <td className={styles.cellData}>{request?.software}</td>
                </tr>
              </tbody>
            </table>

            <div className={styles.formContainer}>
              <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
                    {attendants.map((attendant) =>
                      selectUserPlaceholder(attendant)
                    )}
                  </select>
                </div>
                <div className={styles.inputDateContainer}>
                  <div className={styles.iconContainerDate}>
                    <GrAction />
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
                </div>
                <div className={styles.inputContainer}>
                  <div
                    className={`${styles.statusIconContainer} ${
                      selectedStatus ? statusClassMap[selectedStatus] : ""
                    }`}
                  >
                    <FaRegCircle className={styles.statusIcon} />
                  </div>
                  <select
                    {...register("status")}
                    className={styles.formStatusSelectInput}
                    value={selectedStatus}
                    onChange={(e) =>
                      setSelectedStatus(
                        e.target.value as keyof typeof statusClassMap
                      )
                    }
                  >
                    <option key={null} value={"pending"} disabled hidden>
                      Pendiente
                    </option>
                    {statusTypes.map((status) =>
                      selectStatusPlaceholder(status)
                    )}
                  </select>
                </div>
                <button type="submit" className={styles.formButton}>
                  Continuar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
