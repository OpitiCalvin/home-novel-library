import React, { FunctionComponent } from "react";
import useSWR from "swr";
import { IBookImageResponse } from "@/lib/schemas";
import ImageSlider from "./ImageSlider";

type Props = {
  bookId: number;
};
const BookImageSlider: FunctionComponent<Props> = ({ bookId }) => {
  const { data, error, isLoading } = useSWR(`books/${bookId}/images`);

  if (error) return <div>Failed to Load.</div>;
  if (isLoading) return <div>Loading book cover images...</div>;
  if (data) {
    const bookImages: IBookImageResponse[] = data["images"];

    if (bookImages.length > 0) {
      return (
        <div>
          <h3>Cover Images</h3>
          <hr />
          <ImageSlider images={bookImages} />
        </div>
      );
    }
  }
};

export default BookImageSlider;
