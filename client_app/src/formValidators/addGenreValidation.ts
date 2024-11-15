import { zfd } from "zod-form-data";
import {z} from "zod";

export const genreFormSchema = zfd.formData({
  name: zfd.text(z.string().min(2, "Too short").max(50, "Too long")),
  category: zfd.text(z.string().min(2, "Too short").max(50, "Too long")),
  description: zfd.text(z.string().min(10, "Too short").max(500, "Too long"))
});