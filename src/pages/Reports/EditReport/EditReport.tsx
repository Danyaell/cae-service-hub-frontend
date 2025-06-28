import { useEffect, useState } from "react";
import { Report, ReportForm } from "../../../types/report.types";
import { editReportService, getReportById } from "../../../api/reports.service";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./EditReport.module.css";
import { BsPersonFill } from "react-icons/bs";
import { GrAction, GrStatusGoodSmall } from "react-icons/gr";
import { useForm } from "react-hook-form";
import { useAuthStrore } from "../../../store/login.store";
import { Attendant } from "../../../types/user.types";
import { getUsersService } from "../../../api/users.service";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function EditReport() {
  const user = useAuthStrore((state) => state.user);
  const [attendants, setAttendants] = useState<Attendant[]>([]);
  const statusTypes = [
    { id: "pending", name: "Pendiente" },
    { id: "in_progress", name: "En Progreso" },
    { id: "needs_attention", name: "Necesita Atención" },
    { id: "completed", name: "Completado" },
    { id: "cancelled", name: "Cancelado" },
  ];
  const [report, setReport] = useState<Report>();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm<ReportForm>({
    defaultValues: {
      reportDate: report?.report_date,
      reporterName: report?.reporter_name,
      role: report?.role,
      room: report?.room,
      pc: report?.pc,
      description: report?.description,
      attendantId: report?.attendant_id,
      actionTaken: report?.action_taken,
      status: report?.status,
    },
  });

  useEffect(() => {
    if (user && attendants.length > 0 && !report?.attendant_id) {
      setValue("attendantId", user.id);
    }
    if (report) {
      setValue("reportDate", new Date(report.report_date));
      setValue("reporterName", report.reporter_name);
      setValue("role", report.role);
      setValue("room", report.room);
      setValue("pc", report.pc);
      setValue("description", report.description);
      setValue("attendantId", report.attendant_id ?? user?.id ?? -1);
      setValue("actionTaken", report.action_taken);
      setValue("status", report.status);
    }
  }, [report, user, attendants, setValue]);

  useEffect(() => {
    getUsersService()
      .then(setAttendants)
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (id) {
      getReportById(parseInt(id))
        .then((data) => {
          setReport(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  const selectUserPlaceholder = (user: Attendant) => {
    return (
      <option className={styles.roomOptions} key={user.id} value={user.id}>
        {user.name}
      </option>
    );
  };

  const selectStatusPlaceholder = (status: { id: string; name: string }) => {
    return (
      <option className={styles.roomOptions} key={status.id} value={status.id}>
        {status.name}
      </option>
    );
  };

  const onSubmit = async (data: ReportForm) => {
    console.log("Data to submit:", data);
    try {
      await editReportService(data, parseInt(id!));
      navigate(user ? "/reports" : "/result", {
        state: {
          success: true,
          message1: "Realizado",
          message2: "Reporte editado exitosamente.",
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
      <div className={styles.editContainer}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Reporte #{report?.id}</h1>
          <h2 className={styles.subtitle}>Computadora {report?.pc}</h2>
        </div>
        <div className={styles.container}>
          <div className={styles.infoContainer}>
            <table className={styles.table}>
              <tbody>
                <tr className={styles.rowData}>
                  <td className={styles.cellData}>Fecha del Reporte</td>
                  <td className={styles.cellData}>
                    {report?.report_date
                      ? new Date(report?.report_date).toLocaleDateString(
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
                  <td className={styles.cellData}>Reportado por</td>
                  <td className={styles.cellData}>{report?.reporter_name}</td>
                </tr>
                <tr>
                  <td className={styles.cellData}>Aula</td>
                  <td className={styles.cellData}>{report?.room}</td>
                </tr>
                <tr>
                  <td className={styles.cellData}>PC</td>
                  <td className={styles.cellData}>{report?.pc}</td>
                </tr>
                <tr>
                  <td className={styles.cellData}>Descrpición</td>
                  <td className={styles.cellData}>{report?.description}</td>
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
                <div className={styles.inputContainer}>
                  <div className={styles.iconContainer}>
                    <GrStatusGoodSmall />
                  </div>
                  <select
                    {...register("status")}
                    className={styles.formStatusSelectInput}
                    defaultValue={report?.status || "pending"}
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
