import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

type FormData = {
  sala: string;
  pc: string;
  date: string;
  reporterName: string;
  selector: [];
  description: string;
  responsable: string;
  action: string;
};

export default function Reports() {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log('Datos enviados:', data);
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
      <hr />
      <button type="submit" className="">
        <Link to="/result">Continuar</Link>
      </button>
    </form>
  );

  /* return (
    <>
      <h1>Reporte de falla de máquina</h1>
      <div>
        <p>Sala:</p>
        <input type="text" placeholder="Sala" />
        <p>PC:</p>
        <input type="text" placeholder="PC" />
      </div>
      
    </>
  ); */
}
