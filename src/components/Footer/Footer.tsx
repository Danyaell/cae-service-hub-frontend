import {
  TiSocialFacebook,
  TiSocialInstagram,
  TiSocialTwitter,
} from "react-icons/ti";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import { IoIosArrowUp } from "react-icons/io";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <button className={styles.buttonGoTop}>
          <IoIosArrowUp />
        </button>
      </div>

      <div className={styles.linksContainer}>
        <div className={styles.generalLinks}>
          <h2 className={styles.footerTitle}>ENLACES</h2>
          <p className={styles.footerText} />
          <li className={styles.linkList}>
            <ul className={styles.linkItem}>
              <Link to={""} className={styles.link}>
                Opción 1
              </Link>
            </ul>
            <ul className={styles.linkItem}>
              <Link to={""} className={styles.link}>
                Opción 1
              </Link>
            </ul>
            <ul className={styles.linkItem}>
              <Link to={""} className={styles.link}>
                Opción 1
              </Link>
            </ul>
          </li>
        </div>

        <div className={styles.socialLinks}>
          <h2 className={styles.footerTitle}>CONÉCTATE</h2>
          <li className={styles.socialLinkList}>
            <ul>
              <Link
                to={"https://x.com/fesaragonunam?lang=es"}
                className={styles.socialIcon}
              >
                <TiSocialTwitter />
              </Link>
            </ul>
            <ul>
              <Link
                to={"https://www.facebook.com/FESAragonUNAM/"}
                className={styles.socialIcon}
              >
                <TiSocialFacebook />
              </Link>
            </ul>
            <ul>
              <Link
                to={"https://www.instagram.com/fesaragonunam/?hl=es"}
                className={styles.socialIcon}
              >
                <TiSocialInstagram />
              </Link>
            </ul>
          </li>
          <p>
            Para el uso de la plataforma se pueden usar redes cableadas o
            inalámbricas y un ancho de banda mínimo de 2 Mbps.
          </p>
        </div>
      </div>

      <br />
      <br />

      <div className={styles.footerCopyright}>
        Hecho en México, Universidad Nacional Autónoma de México (UNAM), todos
        los derechos reservados 2025. Esta página puede ser reproducida con
        fines no lucrativos, siempre y cuando no se mutile, se cite la fuente
        completa y su dirección electrónica. De otra forma, requiere permiso
        previo por escrito de la institución.
      </div>
    </footer>
  );
}
