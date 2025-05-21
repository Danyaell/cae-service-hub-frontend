import { useEffect, useState } from "react";
import { Report } from "../../types/report.types";
import ReportsTable from "./components/ReportsTable";
import styles from "./Reports.module.css";
import { getAllReportsService } from "../../api/reports.service";
import { NavLink } from "react-router-dom";

export default function Reports() {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setReports(await getAllReportsService());
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };
    fetchReports();
  }, []);
  return (
    <div>
      <div className={styles.reportsHeader}>
        <h1 className={styles.title}>Reportes</h1>
        <NavLink to="/create-report" className={styles.createReportButton}>
          Crear Reporte
        </NavLink>
      </div>
      <ReportsTable reports={reports} />
    </div>
  );
}
