import React from "react";
import useSWR from "swr";
import { fetcher } from "@/api/apiFetcher";
import { IBook, IGenreResponse } from "../utils/schemas";
import MultiSelectDropDown from "./MultiSelectDropdown";
import { FieldErrors, UseFormRegister } from "react-hook-form";

const GenreMultiSelect = ({
  register,
  errors,
}: {
  register: UseFormRegister<IBook>;
  errors: FieldErrors<IBook>;
}) => {
  const { data, error, isLoading } = useSWR("genres", fetcher);

  if (error) return <div>Failed to Load...</div>;
  if (isLoading) return <div>Loading genres...</div>;

  if (data) {
    const genres: IGenreResponse[] = data["genres"];
    return (
      <MultiSelectDropDown
        register={register}
        errors={errors}
        // formFieldName={"genres"}
        options={genres}
        // onChange={(selected) => {
        //   console.debug("Selected", selected);
        // }}
        prompt="Select One or More Genres"
      />
    );
  }
};

export default GenreMultiSelect;
