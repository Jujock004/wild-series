import type { ReactNode } from "react";

type ProgramData = {
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
  category_id: number;
};

type ProgramFormProps = {
  children: ReactNode;
  defaultValue: ProgramData;
  onSubmit: (program: ProgramData) => void;
  categories?: Array<{ id: number; name: string }>;
};

function ProgramForm({
  children,
  defaultValue,
  onSubmit,
  categories,
}: ProgramFormProps) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const newProgram = {
          title: formData.get("title") as string,
          synopsis: formData.get("synopsis") as string,
          poster: formData.get("poster") as string,
          country: formData.get("country") as string,
          year: Number(formData.get("year")),
          category_id: Number(formData.get("category_id")),
        };
        onSubmit(newProgram);
      }}
    >
      <label htmlFor="title">Titre</label>
      <input
        type="text"
        id="title"
        name="title"
        defaultValue={defaultValue.title}
        required
      />
      <label htmlFor="synopsis">Synopsis</label>
      <textarea
        id="synopsis"
        name="synopsis"
        defaultValue={defaultValue.synopsis}
        required
      />
      <label htmlFor="poster">URL de l'affiche</label>
      <input
        type="url"
        id="poster"
        name="poster"
        defaultValue={defaultValue.poster}
        required
      />
      <label htmlFor="country">Pays</label>
      <input
        type="text"
        id="country"
        name="country"
        defaultValue={defaultValue.country}
        required
      />
      <label htmlFor="year">Année</label>
      <input
        type="number"
        id="year"
        name="year"
        defaultValue={defaultValue.year}
        required
      />
      <label htmlFor="category_id">Catégorie</label>
      <select
        id="category_id"
        name="category_id"
        defaultValue={defaultValue.category_id}
        required
      >
        <option value="">Sélectionnez une catégorie</option>
        {categories?.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <button type="submit">{children}</button>
    </form>
  );
}

export default ProgramForm;
