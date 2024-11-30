import React, { FunctionComponent } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { IAuthorResponse } from "@/lib/schemas";

type Props = {
  author: IAuthorResponse;
};

const AuthorCard: FunctionComponent<Props> = ({ author }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4 text-center">
      <h2 className="text-2xl font-semibold text-gray-800">{author.name}</h2>
      <p className="text-sm text-gray-500">{author.bio}</p>
      <hr className="my-2" />
      <div>
        <Link
          href={`/authors/${author.id}`}
          className="text-white bg-gray-400 hover:bg-blue-400 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          View Info & Books{" "}
          <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default AuthorCard;
