import React, { FunctionComponent } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { IGenreResponse } from "@/lib/schemas";

type Props = {
  genre: IGenreResponse;
};
const GenreCard: FunctionComponent<Props> = ({ genre }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4 text-center">
      <h2 className="text-2xl font-semibold text-gray-800">{genre.name}</h2>
      <hr className="my-2" />
      <div>
        <Link href={`/genres/${genre.id}`}>
          View Info & Books <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>
    </div>
  );
};

export default GenreCard;
