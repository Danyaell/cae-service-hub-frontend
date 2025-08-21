import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useAuthStrore } from "../../store/login.store";
import { UserDropdown } from "../UserDropdown/UserDropdown";

export default function Navbar() {
  const user = useAuthStrore(state => state.user);

  return (
    <div className={styles.logoContainer}>
      <div className={styles.logo}>
        <NavLink to="https://www.unam.mx/" target="_blank" className={styles.logoLink}>
          <img src="../../../public/logo-unam.png" className={styles.logoUnam} />
        </NavLink>
        <NavLink to="https://www.aragon.unam.mx" target="_blank" className={styles.logoLink}>
          <img src="../../../public/logo-fes.png" className={styles.logoFes} />
        </NavLink>
      </div>
      <nav>
        <ul className={styles.nav}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? styles.navButtonActive : styles.navButton
              }
            >
              INICIO
            </NavLink>
          </li>
          <li>
            <NavLink
              to={user ? "/reports" : "create-report"}
              className={({ isActive }) =>
                isActive ? styles.navButtonActive : styles.navButton
              }
            >
              REPORTES
            </NavLink>
          </li>
          <li>
            <NavLink
              to={user ? "/requests" : "create-request"}
              className={({ isActive }) =>
                isActive ? styles.navButtonActive : styles.navButton
              }
            >
              SOLICITUDES
            </NavLink>
          </li>
          <li>
            <NavLink
              to={user ? "/lost-items" : "create-lost-item"}
              className={({ isActive }) =>
                isActive ? styles.navButtonActive : styles.navButton
              }
            >
              OBJETOS PERDIDOS
            </NavLink>
          </li>
          <li>
            {!user && (
              <NavLink to="/login" className={styles.navButtonLogin}>
              LOGIN
            </NavLink>
            ) || user && (
              <UserDropdown />
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
