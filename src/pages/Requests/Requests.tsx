import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CustomDatePicker } from "../../components/CustomDatePicker/CustomDatePicker";

type FormData = {
  date: Date | null;
  requesterName: string;
  sala: string;
  serviceRequested: string;
  attendant: string;
  commitmentDate: Date | null;
};

export default function Requests() {
  const { register, handleSubmit, control } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    console.log("Datos enviados:", data);
    navigate("/result");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <h1>SOLICITUD DE INSTALACIÓN DE SOFTWARE</h1>

      <p>Fecha:</p>
      <Controller
        control={control}
        name="date"
        render={({ field }) => (
          <CustomDatePicker
            selectedDate={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <p>Nombre de quien solicita:</p>
      <input
        {...register("requesterName")}
        placeholder="Nombre"
        className="border p-2 w-full"
      />
      <p>Sala:</p>
      <input
        {...register("sala")}
        placeholder="Sala"
        className="border p-2 w-full"
      />
      <p>Servicio solicitado:</p>
      <input
        {...register("serviceRequested")}
        placeholder="Servicio"
        className="border p-2 w-full"
      />
      <p>Quien atiende:</p>
      <input
        {...register("attendant")}
        placeholder="Nombre"
        className="border p-2 w-full"
      />
      <p>Fecha de compromiso:</p>
      <Controller
        control={control}
        name="commitmentDate"
        render={({ field }) => (
          <CustomDatePicker
            selectedDate={field.value}
            onChange={field.onChange}
          />
        )}
      />

      <br />
      <br />

      <button type="submit" className="">
        Continuar
      </button>
    </form>
  );
}
