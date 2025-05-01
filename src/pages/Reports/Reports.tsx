import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type FormData = {
  sala: string;
  pc: string;
  date: string;
  reporterName: string;
  selector: [];
  description: string;
  asignee: string;
  action: string;
};

export default function Reports() {
  const { register, handleSubmit } = useForm<FormData>();

  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    console.log('Datos enviados:', data);
    navigate('/result');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <p>Sala:</p>
      <input
        {...register('sala')}
        placeholder="Fecha"
        className="border p-2 w-full"
      />
      <p>PC:</p>
      <input
        {...register('pc')}
        placeholder="PC"
        className="border p-2 w-full"
      />
      <p>Fecha:</p>
      <input
        {...register('date')}
        placeholder="Fecha"
        className=""
      />
      <p>Nombre de quien reporta:</p>
      <input
        {...register('reporterName')}
        placeholder="Nombre"
        className=""
      />
      <p>Descripción de la falla:</p>
      <input
        {...register('description')}
        placeholder="Descripción"
        className=""
      />
      <p>Quien atiende:</p>
      <input
        {...register('asignee')}
        placeholder="Nombre"
        className=""
      />
      <p>Acción tomada:</p>
      <input
        {...register('action')}
        placeholder="Acción"
        className=""
      />
      <button type="submit" className="">
        Continuar
      </button>
    </form>
  );
}
