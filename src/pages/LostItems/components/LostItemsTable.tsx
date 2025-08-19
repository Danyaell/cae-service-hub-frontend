import { HiDotsVertical } from "react-icons/hi";
import styles from "./LostItemsTable.module.css";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import { ConfirmModal } from "../../../components/ConfirmationModal/ConfirmationModal";
import { deleteLostItemById } from "../../../api/lostItems.service";
import { LostItem } from "../../../types/lostItem.types";

interface LostItemsTableProps {
  lostItems: LostItem[];
  onRefresh: () => void;
}

const LostItemsTable: React.FC<LostItemsTableProps> = ({ lostItems, onRefresh }) => {
  const [dropdownClicked, setDropdownClicked] = useState<number | null>(null);
  const dropdownRefs = useRef<Record<number, HTMLTableDataCellElement | null>>(
    {}
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lostItemToDelete, setLostItemToDelete] = useState<number | null>(null);

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

  const getStatusName = (status: boolean) => {
    return status ? "REGRESADO" : "NO REGRESADO";
  };

  const handleDropdownClick = (id: number) => {
    setDropdownClicked((current) => (current === id ? null : id));
  };

  const handleDeleteClick = (id: number) => {
    setLostItemToDelete(id);
    setIsModalOpen(true);
    setDropdownClicked(null);
  };

  const confirmDelete = async () => {
    if (lostItemToDelete !== null) {
      try {
        await deleteLostItemById(lostItemToDelete);
        await onRefresh();
      } catch (err) {
        console.error("Error eliminando objeto", err);
      } finally {
        setIsModalOpen(false);
        setLostItemToDelete(null);
      }
    }
  };

  return (
    <>
      {(lostItems.length > 0 && (
        <div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.columnHeader}>Fecha</th>
                <th className={styles.columnHeader}>Sala</th>
                <th className={styles.columnHeader}>Descripción</th>
                <th className={styles.columnHeader}>Estado</th>
                <th className={styles.columnHeader}></th>
              </tr>
            </thead>
            <tbody>
              {lostItems.map((item) => (
                <tr key={item.id} className={styles.rowData}>
                  <td className={styles.cellData}>
                    {new Date(item.date)
                      .toLocaleDateString("es-MX", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      })
                      .toUpperCase()}
                  </td>
                  <td className={styles.cellData}>{item.room}</td>
                  <td className={styles.cellData}>{item.description}</td>
                  <td className={styles.cellData}>
                    <div
                      className={styles.cellDataStatus}
                      data-status={item.returned}
                    >
                      {getStatusName(item.returned)}
                    </div>
                  </td>
                  <td
                    className={styles.cellDataActionButton}
                    ref={(el) => {
                      dropdownRefs.current[item.id] = el;
                    }}
                  >
                    <button
                      onClick={() => handleDropdownClick(item.id)}
                      className={styles.actionsButton}
                    >
                      <HiDotsVertical className={styles.actionsButtonIcon} />
                    </button>
                    {dropdownClicked === item.id && (
                      <div className={styles.dropdownContainer}>
                        <ul className={styles.dropdownMenu}>
                          <li className={styles.dropdownMenuItem}>
                            <NavLink
                              to={`/edit-lost-item/${item.id}`}
                              onClick={() => setDropdownClicked(null)}
                              className={styles.dropdownLink}
                            >
                              <MdEdit className={styles.dropdownIcon} />
                              Editar
                            </NavLink>
                          </li>
                          <li
                            className={styles.dropdownMenuItem}
                            onClick={() => handleDeleteClick(item.id)}
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
        message="¿Seguro que quieres eliminar este objeto?"
      />
    </>
  );
};

export default LostItemsTable;
