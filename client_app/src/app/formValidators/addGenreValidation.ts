import { zfd } from "zod-form-data";
import {z} from "zod";

export const genreFormSchema = zfd.formData({
  name: zfd.text(z.string().min(2, "Too short").max(50, "Too long"))
});