import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgramForm from "../components/ProgramForm";

function ProgramNew() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3310/api/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);

  const newProgram = {
    title: "",
    synopsis: "",
    poster: "",
    country: "",
    year: 0,
    category_id: 0,
  };

  return (
    <ProgramForm
      defaultValue={newProgram}
      categories={categories}
      onSubmit={(data) => {
        fetch("http://localhost:3310/api/programs", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            navigate(`/programs/${data.insertId}`);
          })
          .catch((error) => {
            console.error("Erreur détaillée:", error);
          });
      }}
    >
      Ajouter
    </ProgramForm>
  );
}

export default ProgramNew;
