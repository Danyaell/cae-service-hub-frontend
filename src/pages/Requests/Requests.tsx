import { Link } from "react-router-dom";

export default function Requests() {
  return (
    <div>
      <h1>Requests</h1>
      <p>This is the main content of the requests page.</p>
      <Link to="/result">Continuar</Link>
    </div>
  );
}
