import React, { FunctionComponent } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Author } from "../utils/schemas";

type Props = {
  index: number;
  author: Author;
};
const AuthorCard: FunctionComponent<Props> = ({ index, author }) => {
  return (
    <div key={index} className="bg-white shadow-md rounded-md p-4 text-center">
      <h2 className="text-2xl font-semibold text-gray-800">{author.name}</h2>
      {/* <p className="text-lg text-gray-600">{author.bio}</p>
            <p className="text-sm text-gray-500">
              {author.genre.name}, {author.published_year}
            </p> */}
      <hr className="my-2" />
      <div>
        <Link href={`/authors/${author.id}`}>
          View Info & Books <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>
    </div>
  );
};

export default AuthorCard;
