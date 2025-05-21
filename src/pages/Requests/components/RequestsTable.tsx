import { HiDotsVertical } from "react-icons/hi";
import { SoftwareRequest } from "../../../types/softwareRequest.types";
import styles from "./RequestsTable.module.css";

interface RequestsTableProps {
  softwareRequests: SoftwareRequest[];
}

const RequestsTable: React.FC<RequestsTableProps> = ({ softwareRequests }) => {
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
                <td className={styles.cellData}>
                  <HiDotsVertical />
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
