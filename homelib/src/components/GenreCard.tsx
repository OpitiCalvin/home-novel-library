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
      <h5 className="text-2xl font-semibold text-blue-800">{genre.name}</h5>
      <p className="text-sm text-gray-500">{genre.description}</p>
      <p className="text-lg font-semibold text-gray-600">{genre.category}</p>
      <hr className="my-2" />
      <div>
        <Link href={`/genres/${genre.id}`}
        // className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          View Info & Books <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>
    </div>
  );
};

export default GenreCard;
