import { NavLink, useLocation } from "react-router-dom";
import styles from "./Result.module.css";
import { FcExpired, FcInspection } from "react-icons/fc";

export default function Result() {
  const location = useLocation();
  const result = location.state as { success: boolean; message1: string, message2: string, textButton: string } | null;

  return (
    <div>
      <h1 className={styles.title}>{result?.message1}</h1>
      {result && (
        <div
          className={result.success ? styles.successBanner : styles.errorBanner}
        >
          <div className={styles.iconContainer}>
            {(result.success && <FcInspection className={styles.icon} />) || (
              <FcExpired className={styles.icon} />
            )}
          </div>
          <p className={styles.message}>{result.message2}</p>
          <NavLink to={result.success ? "/" : "/create-report"}>{result.textButton}</NavLink>
        </div>
      )}
    </div>
  );
}
