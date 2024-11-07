import { zfd } from "zod-form-data";
import {z} from "zod";

export const bookFormSchema = zfd.formData({
  title: zfd.text(z.string().min(2, "Too short").max(50, "Too long")),
  authorId: zfd.numeric(z.number().refine(value => value != 0, {message: "Select Author or create a new author record."})),
  publishedYear: zfd.numeric(z.number()),
  isbn: zfd.text(z.string().min(2, "Too short").max(20, "Too long")),
  description: zfd.text(z.string().min(10, "Too short").max(250, "Too long")),
  availabilityStatus: zfd.text(z.string().min(2, "Too short").max(20, "Too long")),
  readStatus: zfd.text(z.string().min(2, "Too short").max(20, "Too long")),
  // genreId: zfd.numeric(z.number()),
});