import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./CustomDatePicker.module.css";

type Props = {
  selectedDate?: Date | null;
  onChange?: (date: Date | null) => void;
};

export const CustomDatePicker = ({ selectedDate, onChange }: Props) => {
  console.log("DatePicker props:", { selectedDate, onChange });

  return (
    <DatePicker
      selected={selectedDate}
      onChange={onChange}
      className={styles.customDatePicker}
      dateFormat="dd/MM/yyyy"
      placeholderText="Fecha (dd/MM/yyyy)"
      isClearable
      showPopperArrow={false}
      popperClassName={styles.customDatepickerPopper}
    />
  );
};
