import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type ProgramDeleteFormProps = {
  id: number;
  children: ReactNode;
};

function ProgramDeleteForm({ id, children }: ProgramDeleteFormProps) {
  const navigate = useNavigate();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        fetch(`http://localhost:3310/api/programs/${id}`, {
          method: "delete",
        }).then((response) => {
          if (response.status === 204) {
            navigate("/programs");
          }
        });
      }}
    >
      <button type="submit">{children}</button>
    </form>
  );
}

export default ProgramDeleteForm;
