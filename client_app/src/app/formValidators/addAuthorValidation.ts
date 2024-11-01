import { zfd } from "zod-form-data";
import {z} from "zod";

export const authorFormSchema = zfd.formData({
  name: zfd.text(z.string().min(5, "Too short").max(50, "Too long")),
  bio: zfd.text(z.string().min(10, "Too short").max(250, "Too long")),
});