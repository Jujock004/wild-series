import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Program {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
}

const Programs = () => {
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    fetch("http://localhost:3310/api/programs/")
      .then((response) => response.json())
      .then((data: Program[]) => setPrograms(data))
      .catch((error) => console.error("Error fetching programs:", error));
  }, []);

  return (
    <div>
      <Link to={"/programs/new"}>Ajouter</Link>
      <h1>Liste des programmes</h1>
      {programs.map((program) => (
        <article key={program.id}>
          <Link to={`/programs/${program.id}`}>
            <img src={program.poster} alt={`${program.title} poster`} />
          </Link>
          <h2>
            <Link to={`/programs/${program.id}`}>{program.title}</Link>
          </h2>
          <p>{program.synopsis}</p>
          <p>Pays: {program.country}</p>
          <p>Année: {program.year}</p>
        </article>
      ))}
    </div>
  );
};

export default Programs;
