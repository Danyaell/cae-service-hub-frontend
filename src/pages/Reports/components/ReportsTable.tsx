import { HiDotsVertical } from "react-icons/hi";
import styles from "./ReportsTable.module.css";
import { Report } from "../../../types/report.types";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import { ConfirmModal } from "../../../components/ConfirmationModal/ConfirmationModal";
import { deleteReportById } from "../../../api/reports.service";

interface ReportsTableProps {
  reports: Report[];
  onRefresh: () => void;
}

const ReportsTable: React.FC<ReportsTableProps> = ({ reports, onRefresh }) => {
  const [dropdownClicked, setDropdownClicked] = useState<number | null>(null);
  const dropdownRefs = useRef<Record<number, HTMLTableDataCellElement | null>>(
    {}
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reportToDelete, setReportToDelete] = useState<number | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const isOutside = Object.values(dropdownRefs.current).every(
        (ref) => ref && !ref.contains(e.target as Node)
      );
      if (isOutside) {
        setDropdownClicked(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getStatusName = (status: string) => {
    const statusMap: Record<string, string> = {
      pending: "PENDIENTE",
      in_progress: "EN PROGRESO",
      needs_attention: "ATENCIÓN",
      completed: "COMPLETADO",
      cancelled: "CANCELADO",
    };
    return statusMap[status] || "Desconocido";
  };

  const handleDropdownClick = (id: number) => {
    setDropdownClicked((current) => (current === id ? null : id));
  };

  const handleDeleteClick = (id: number) => {
    setReportToDelete(id);
    setIsModalOpen(true);
    setDropdownClicked(null);
  };

  const confirmDelete = async () => {
    if (reportToDelete !== null) {
      try {
        await deleteReportById(reportToDelete);
        await onRefresh();
      } catch (err) {
        console.error("Error eliminando reporte", err);
      } finally {
        setIsModalOpen(false);
        setReportToDelete(null);
      }
    }
  };

  return (
    <>
      {(reports.length > 0 && (
        <div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.columnHeader}>Fecha de solicitud</th>
                <th className={styles.columnHeader}>Reporta</th>
                <th className={styles.columnHeader}>Sala</th>
                <th className={styles.columnHeader}>PC</th>
                <th className={styles.columnHeader}>Descripción</th>
                <th className={styles.columnHeader}>Atiende</th>
                <th className={styles.columnHeader}>Estado</th>
                <th className={styles.columnHeader}></th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r.id} className={styles.rowData}>
                  <td className={styles.cellData}>
                    {new Date(r.report_date)
                      .toLocaleDateString("es-MX", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      })
                      .toUpperCase()}
                  </td>
                  <td className={styles.cellData}>{r.reporter_name}</td>
                  <td className={styles.cellData}>{r.room}</td>
                  <td className={styles.cellData}>{r.pc}</td>
                  <td className={styles.cellData}>{r.description}</td>
                  <td className={styles.cellData}>{r.attendant?.name}</td>
                  <td className={styles.cellData}>
                    <div
                      className={styles.cellDataStatus}
                      data-status={r.status}
                    >
                      {getStatusName(r.status)}
                    </div>
                  </td>
                  <td
                    className={styles.cellDataActionButton}
                    ref={(el) => {
                      dropdownRefs.current[r.id] = el;
                    }}
                  >
                    <button
                      onClick={() => handleDropdownClick(r.id)}
                      className={styles.actionsButton}
                    >
                      <HiDotsVertical className={styles.actionsButtonIcon} />
                    </button>
                    {dropdownClicked === r.id && (
                      <div className={styles.dropdownContainer}>
                        <ul className={styles.dropdownMenu}>
                          <li className={styles.dropdownMenuItem}>
                            <NavLink
                              to={`/edit-report/${r.id}`}
                              onClick={() => setDropdownClicked(null)}
                              className={styles.dropdownLink}
                            >
                              <MdEdit className={styles.dropdownIcon} />
                              Editar
                            </NavLink>
                          </li>
                          <li
                            className={styles.dropdownMenuItem}
                            onClick={() => handleDeleteClick(r.id)}
                          >
                            <span className={styles.dropdownLink}>
                              <MdDelete className={styles.dropdownIcon} />
                              Eliminar
                            </span>
                          </li>
                        </ul>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )) || <>No se encuentran datos</>}
      <ConfirmModal
        isOpen={isModalOpen}
        onConfirm={confirmDelete}
        onCancel={() => setIsModalOpen(false)}
        message="¿Seguro que quieres eliminar este reporte?"
      />
    </>
  );
};

export default ReportsTable;
