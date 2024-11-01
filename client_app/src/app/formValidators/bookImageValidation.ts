import { zfd } from "zod-form-data";
import {z} from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg','image/jpg', 'image/png', 'image/webp']

export const bookImageFormSchema = zfd.formData({
  title: zfd.text(z.string().min(2, "Too short").max(50, "Too long")),
  // authorId: zfd.numeric(z.number()),
  // genreId: zfd.numeric(z.number()),
  // publishedYear: zfd.numeric(z.number()),
  // isbn: zfd.text(z.string().min(2, "Too short").max(20, "Too long")),
  // description: zfd.text(z.string().min(10, "Too short").max(250, "Too long")),
  // availabilityStatus: zfd.text(z.string().min(2, "Too short").max(20, "Too long")),
  // readStatus: zfd.text(z.string().min(2, "Too short").max(20, "Too long")),
  coverImage: typeof window === 'undefined' ?z.any() : z.instanceof(FileList)
    .refine(files => files?.length == 1, "File is required")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, 'Max image size is 5MB.')
    .refine(files => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )
});