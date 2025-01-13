import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProgramForm from "../components/ProgramForm";

type Program = {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
  category_id: number;
};

type Category = {
  id: number;
  name: string;
};

function ProgramEdit() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [program, setProgram] = useState<Program | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3310/api/programs/${id}`)
      .then((response) => response.json())
      .then((data: Program) => {
        setProgram(data);
      });
    fetch("http://localhost:3310/api/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, [id]);

  return (
    program && (
      <ProgramForm
        defaultValue={program}
        categories={categories}
        onSubmit={(data) => {
          fetch(`http://localhost:3310/api/programs/${program.id}`, {
            method: "put",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }).then((response) => {
            if (response.status === 204) {
              navigate(`/programs/${program.id}`);
            }
          });
        }}
      >
        Modifier
      </ProgramForm>
    )
  );
}

export default ProgramEdit;
