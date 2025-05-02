import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CustomDatePicker from "../../components/CustomDatePicker/CustomDatePicker";

type FormData = {
  date: string;
  requesterName: string;
  sala: string;
  serviceRequested: string;
  attendant: string;
  commitmentDate: string;
};

export default function Requests() {
  const { register, handleSubmit } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    console.log("Datos enviados:", data);
    navigate("/result");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <h1>SOLICITUD DE INSTALACIÓN DE SOFTWARE</h1>
      <p>Fecha:</p>
      <CustomDatePicker/>
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
      <CustomDatePicker/>

      <br />
      <br />

      <button type="submit" className="">
        Continuar
      </button>
    </form>
  );
}
