import { Link } from "react-router-dom";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div>
      <h1>INICIO</h1>
      <br />
      <br />
      <div>
        <Link to="/reports">
          <button className={styles.linkButton}>REPORTES</button>
        </Link>
      </div>
      <div>
        <Link to="/requests">
          <button className={styles.linkButton}>SOLICITUDES</button>
        </Link>
      </div>
    </div>
  );
}
