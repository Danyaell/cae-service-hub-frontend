import { HiDotsVertical } from "react-icons/hi";
import styles from "./ReportsTable.module.css";
import { Report } from "../../../types/report.types";

interface ReportsTableProps {
  reports: Report[];
}

const ReportsTable: React.FC<ReportsTableProps> = ({ reports }) => {
  return (
    (reports.length > 0 && (
      <div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.columnHeader}>Fecha de solicitud</th>
              <th className={styles.columnHeader}>Reporta</th>
              <th className={styles.columnHeader}>Rol</th>
              <th className={styles.columnHeader}>Sala</th>
              <th className={styles.columnHeader}>PC</th>
              <th className={styles.columnHeader}>Descripción</th>
              <th className={styles.columnHeader}>Solución</th>
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
                <td className={styles.cellData}>{r.role}</td>
                <td className={styles.cellData}>{r.room}</td>
                <td className={styles.cellData}>{r.pc}</td>
                <td className={styles.cellData}>{r.description}</td>
                <td className={styles.cellData}>{r.action_taken}</td>
                <td className={styles.cellData}>{r.attendant?.name}</td>
                
                <td className={styles.cellData}>
                  <div className={styles.cellDataStatus} data-status={r.status}>
                    {r.status}
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

export default ReportsTable;
