import { useEffect, useState } from "react";
import { getAllSoftwareRequestsService } from "../../api/softwareRequests.service";
import { SoftwareRequest } from "../../types/softwareRequest.types";
import RequestsTable from "./components/RequestsTable";
import styles from "./Requests.module.css";
import { NavLink } from "react-router-dom";

export default function Requests() {
  const [softwareRequests, setSoftwareRequests] = useState<SoftwareRequest[]>(
    []
  );

  useEffect(() => {
    const fetchSoftwareRequests = async () => {
      try {
        setSoftwareRequests(await getAllSoftwareRequestsService());
      } catch (error) {
        console.error("Error fetching software requests:", error);
      }
    };
    fetchSoftwareRequests();
  }, []);

  return (
    <div>
      <div className={styles.headerContainer}>
        <div className={styles.requestsHeader}>
          <h1 className={styles.title}>
            Solicitudes de instalación de Software
          </h1>
          <NavLink to="/create-request" className={styles.createRequestButton}>
            Crear Solicitud
          </NavLink>
        </div>
      </div>
      <RequestsTable softwareRequests={softwareRequests} />
    </div>
  );
}
