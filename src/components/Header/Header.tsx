import Navbar from "../Navbar/Navbar";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Navbar />
      <div>
        <h1 className="">SISTEMA DEL CAE</h1>
      </div>
    </header>
  );
}
