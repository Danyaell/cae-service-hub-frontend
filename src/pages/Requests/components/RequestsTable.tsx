import { HiDotsVertical } from "react-icons/hi";
import { SoftwareRequest } from "../../../types/softwareRequest.types";
import styles from "./RequestsTable.module.css";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";

interface RequestsTableProps {
  softwareRequests: SoftwareRequest[];
}

const RequestsTable: React.FC<RequestsTableProps> = ({ softwareRequests }) => {
  const [dropdownClicked, setDropdownClicked] = useState<number | null>(null);
  const dropdownRefs = useRef<Record<number, HTMLTableDataCellElement | null>>({});

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

  const handleDropdownClick = (id: number) => {
    setDropdownClicked(current => (current === id ? null : id));
  };

  return (
    (softwareRequests.length > 0 && (
      <div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.columnHeader}>Fecha de solicitud</th>
              <th className={styles.columnHeader}>Solicita</th>
              <th className={styles.columnHeader}>Sala</th>
              <th className={styles.columnHeader}>Software</th>
              <th className={styles.columnHeader}>Atiende</th>
              <th className={styles.columnHeader}>Fecha de instalación</th>
              <th className={styles.columnHeader}>Estado</th>
              <th className={styles.columnHeader}></th>
            </tr>
          </thead>
          <tbody>
            {softwareRequests.map((sr) => (
              <tr key={sr.id} className={styles.rowData}>
                <td className={styles.cellData}>
                  {new Date(sr.request_date)
                    .toLocaleDateString("es-MX", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    })
                    .toUpperCase()}
                </td>
                <td className={styles.cellData}>{sr.requestor_name}</td>
                <td className={styles.cellData}>{sr.room}</td>
                <td className={styles.cellData}>{sr.software}</td>
                <td className={styles.cellData}>{sr.attendant?.name}</td>
                <td className={styles.cellData}>
                  {sr.commitment_date
                    ? new Date(sr.commitment_date)
                        .toLocaleDateString("es-MX", {
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                        })
                        .toUpperCase()
                    : ""}
                </td>
                <td className={styles.cellData}>
                  <div className={styles.cellDataStatus} data-status={sr.status}>
                    {sr.status}
                  </div>
                </td>
                <td className={styles.cellDataActionButton} ref={(el) => { dropdownRefs.current[sr.id] = el; }}>
                  <button
                    onClick={() => handleDropdownClick(sr.id)}
                    className={styles.actionsButton}
                  >
                    <HiDotsVertical className={styles.actionsButtonIcon} />
                  </button>
                  {dropdownClicked === sr.id && (
                    <div className={styles.dropdownContainer}>
                      <ul className={styles.dropdownMenu}>
                        <li className={styles.dropdownMenuItem}>
                          <NavLink to={`/edit-request/${sr.id}`} onClick={() => setDropdownClicked(null)} className={styles.dropdownLink}>
                            <MdEdit className={styles.dropdownIcon} />
                            Editar
                          </NavLink>
                        </li>
                        <li className={styles.dropdownMenuItem}>
                          <NavLink to="" className={styles.dropdownLink}>
                            <MdDelete className={styles.dropdownIcon} />
                            Eliminar
                          </NavLink>
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
    )) || <>No se encuentran datos</>
  );
};

export default RequestsTable;
