import { useState, useRef, useEffect } from "react";
import styles from "./UserDropdown.module.css";
import { FaUserCircle } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStrore } from "../../store/login.store";

export const UserDropdown = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const user = useAuthStrore((state) => state.user);
  const logout = useAuthStrore((state) => state.logout);

  // Cierra el dropdown si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div ref={ref}>
      <button onClick={() => setOpen(!open)} className={styles.navUserButton}>
        <FaUserCircle
          className={open ? styles.navUserIconActive : styles.navUserIcon}
        />
      </button>

      {open && (
        <div className={styles.dropdownContainer}>
          <div className={styles.dropdownHeader}>¡Hola, {user?.name}!</div>
          <ul className={styles.dropdownMenu}>
            <li className={styles.dropdownMenuItem}>
              <NavLink to="/" className={styles.dropdownLink}>
                Perfil
              </NavLink>
            </li>
            <li className={styles.dropdownMenuItem}>
              <NavLink to="/" className={styles.dropdownLink}>
                Configuración
              </NavLink>
            </li>
          </ul>
          <button
            className={styles.logoutButton}
            onClick={() => handleLogout()}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
