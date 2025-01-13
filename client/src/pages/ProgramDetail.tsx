import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProgramDeleteForm from "../components/ProgramDeleteForm";

type Program = {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
};

function ProgramDetail() {
  const { id } = useParams<{ id: string }>();
  const [program, setProgram] = useState<Program | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3310/api/programs/${id}`)
      .then((response) => response.json())
      .then((data: Program) => {
        setProgram(data);
      });
  }, [id]);

  return (
    program && (
      <>
        <article key={program.id}>
          <img src={program.poster} alt={`${program.title} poster`} />
          <h2>{program.title}</h2>
          <p>{program.synopsis}</p>
          <p>Pays: {program.country}</p>
          <p>Année: {program.year}</p>
        </article>
        <ProgramDeleteForm id={program.id}>Supprimer</ProgramDeleteForm>
      </>
    )
  );
}

export default ProgramDetail;
