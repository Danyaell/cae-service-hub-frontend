import { GrDocumentConfig } from "react-icons/gr";
import styles from "./Home.module.css";
import { TbMessageReport } from "react-icons/tb";
import { MdSupervisedUserCircle } from "react-icons/md";
import { SiOpenaccess } from "react-icons/si";
import { FaBagShopping, FaComputer } from "react-icons/fa6";

export default function Home() {
  return (
    <div className={styles.contentContainer}>
      <div>
        <h1 className={styles.title}>¿Qué es el CAE?</h1>
        <p className={styles.description}>
          El Centro de Apoyo Extracurricular (CAE) es una unidad de apoyo
          académico de la Facultad de Estudios Superiores Aragón dedicada a
          brindar asistencia técnica y operativa a los laboratorios de cómputo
          de la facultad. Su objetivo principal es asegurar el correcto
          funcionamiento del equipo, el software requerido por docentes y las
          instalaciones, permitiendo así que los espacios destinados a la
          enseñanza se mantengan en óptimas condiciones para alumnos y docentes.
        </p>
      </div>
      <div>
        <h2 className={styles.titleH2}>Servicios que ofrece:</h2>
        <div className={styles.servicesGridContainer}>
          <div>
            <FaComputer className={styles.serviceIcon}/>
            <p className={styles.serviceName}>Mantenimiento y reparación</p>
            <p className={styles.sorviceDescription}>Revisión y corrección de fallas en hardware y periféricos.</p>
          </div>
          <div>
            <GrDocumentConfig className={styles.serviceIcon}/>
            <p className={styles.serviceName}>Instalación y configuración de software</p>
            <p className={styles.sorviceDescription}>Soporte para entornos, herramientas y programas específicos por materia.</p>
          </div>
          <div>
            <TbMessageReport className={styles.serviceIcon}/>
            <p className={styles.serviceName}>Atención a reportes y solicitudes</p>
            <p className={styles.sorviceDescription}>Canales formales para docentes y alumnos que requieran intervención técnica.</p>
          </div>
          <div>
            <MdSupervisedUserCircle className={styles.serviceIcon}/>
            <p className={styles.serviceName}>Supervisión de equipos e instalaciones</p>
            <p className={styles.sorviceDescription}>Monitoreo del estado físico y operativo del mobiliario e infraestructura tecnológica.</p>
          </div>
          <div>
            <SiOpenaccess className={styles.serviceIcon}/>
            <p className={styles.serviceName}>Control de acceso y apertura de aulas</p>
            <p className={styles.sorviceDescription}>Gestión de llaves y apertura oportuna de laboratorios según los horarios establecidos.</p>
          </div>
          <div>
            <FaBagShopping className={styles.serviceIcon}/>
            <p className={styles.serviceName}>Objetos perdidos</p>
            <p className={styles.sorviceDescription}>Entrega de objetos olvidados en las aulas de cómputo</p>
          </div>
        </div>
      </div>
    </div>
  );
}
