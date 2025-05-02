import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./CustomDatePicker.module.css";

export default function CustomDatePicker() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    return (
        <DatePicker
            selected={selectedDate}
            className={styles.customDatePicker}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Selecciona una fecha"
            isClearable
            showPopperArrow={false}
            popperClassName={styles.customDatepickerPopper}
        />
    )
}