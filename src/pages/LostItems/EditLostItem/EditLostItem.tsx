import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./EditLostItem.module.css";
import { useForm } from "react-hook-form";
import { useAuthStrore } from "../../../store/login.store";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaRegCircle } from "react-icons/fa";
import { LostItem, LostItemForm } from "../../../types/lostItem.types";
import {
  editLostItemService,
  getLostItemById,
} from "../../../api/lostItems.service";

export default function EditLostItem() {
  const user = useAuthStrore((state) => state.user);
  const [selectedStatus, setSelectedStatus] =
    useState<boolean>(false);
  const [lostItem, setLostItem] = useState<LostItem>();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm<LostItemForm>({
    defaultValues: {
      date: lostItem?.date,
      room: lostItem?.room,
      description: lostItem?.description,
      returned: lostItem?.returned,
    },
  });

  useEffect(() => {
    if (lostItem) {
      setValue("date", new Date(lostItem.date));
      setValue("room", lostItem.room);
      setValue("description", lostItem.description);
      setValue("returned", lostItem.returned);
    }
  }, [lostItem, setValue]);

  useEffect(() => {
    if (id) {
      getLostItemById(parseInt(id))
        .then((data) => {
          setLostItem(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  useEffect(() => {
    if (lostItem?.returned) {
      setSelectedStatus(lostItem.returned);
    }
  }, [lostItem]);

  const onSubmit = async (data: LostItemForm) => {
    try {
      await editLostItemService(data, parseInt(id!));
      navigate(user ? "/lost-items" : "/result", {
        state: {
          success: true,
          message1: "Realizado",
          message2: "Objeto editado exitosamente.",
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
      <div className={styles.editContainer}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Objeto #{lostItem?.id}</h1>
        </div>
        <div className={styles.container}>
          <div className={styles.infoContainer}>
            <table className={styles.table}>
              <tbody>
                <tr className={styles.rowData}>
                  <td className={styles.cellDataLabel}>Fecha</td>
                  <td className={styles.cellData}>
                    {lostItem?.date
                      ? new Date(lostItem?.date).toLocaleDateString("es-MX", {
                          year: "numeric",
                          month: "long",
                          day: "2-digit",
                        })
                      : ""}
                  </td>
                </tr>
                <tr>
                  <td className={styles.cellDataLabel}>Aula</td>
                  <td className={styles.cellData}>{lostItem?.room}</td>
                </tr>

                <tr>
                  <td className={styles.cellDataLabel}>Descrpición</td>
                  <td className={styles.cellData}>{lostItem?.description}</td>
                </tr>
              </tbody>
            </table>

            <div className={styles.formContainer}>
              <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.inputContainer}>
                  <div
                    className={`${styles.statusIconContainer} ${
                      selectedStatus ? styles.true : styles.false
                    }`}
                  >
                    <FaRegCircle className={styles.statusIcon} />
                  </div>
                  <select
                    {...register("returned")}
                    className={styles.formStatusSelectInput}
                    value={selectedStatus ? "true" : "false"}
                    onChange={(e) =>
                      setSelectedStatus(e.target.value === "true")
                    }
                  >
                    <option className={styles.statusOptions} value="false" data-status="false">
                      NO REGRESADO
                    </option>
                    <option className={styles.statusOptions} value="true" data-status="true">
                      REGRESADO
                    </option>
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
