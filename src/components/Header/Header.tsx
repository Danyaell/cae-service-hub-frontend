import Navbar from "../Navbar/Navbar";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img src="../../../public/logos-unam-fes-aragon.png" className={styles.logo}/>
        <h1 className="text-2xl font-bold">Sistema del CAE</h1>
      </div>
      <Navbar/>
    </header>
  );
}