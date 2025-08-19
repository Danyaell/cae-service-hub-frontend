import { useEffect, useState } from "react";
import styles from "./LostItems.module.css";
import { NavLink, useLocation } from "react-router-dom";
import LostItemsTable from "./components/LostItemsTable";
import { LostItem } from "../../types/lostItem.types";
import { getAllLostItemsService } from "../../api/lostItems.service";

export default function LostItems() {
  const location = useLocation();
  const result = location.state as {
    success: boolean;
    message1: string;
    message2: string;
    textButton: string;
  } | null;
  const [lostItems, setLostItems] = useState<LostItem[]>([]);

  const fetchLostItems = async () => {
    try {
      setLostItems(await getAllLostItemsService());
    } catch (error) {
      console.error("Error fetching objects:", error);
    }
  };

  useEffect(() => {
    fetchLostItems();
  }, []);
  return (
    <div>
      {result && (
        <div
          className={result.success ? styles.successBanner : styles.errorBanner}
        >
          {result.message2}
        </div>
      )}
      <div className={styles.headerContainer}>
        <div className={styles.lostObjectsHeader}>
          <h1 className={styles.title}>Objetos Perdidos</h1>
          <NavLink to="/create-lost-item" className={styles.createLostObjectButton}>
            Reportar Objeto Perdido
          </NavLink>
        </div>
      </div>
      <LostItemsTable lostItems={lostItems} onRefresh={fetchLostItems} />
    </div>
  );
}
