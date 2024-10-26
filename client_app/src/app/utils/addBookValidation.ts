import { zfd } from "zod-form-data";
import {z} from "zod";

export const formSchema = zfd.formData({
    title: zfd.text(z.string().min(2, "Too short").max(50, "Too long")),
  author: zfd.text(z.string().min(2, "Too short").max(30, "Too long")),
  genre: zfd.text(z.string().min(2, "Too short").max(20, "Too long")),
  year: zfd.numeric(z.number()),
  isbn: zfd.text(z.string().min(2, "Too short").max(20, "Too long")),
  description: zfd.text(z.string().min(10, "Too short").max(250, "Too long")),
  availability_status: zfd.text(z.string().min(2, "Too short").max(20, "Too long")),
  read_status: zfd.text(z.string().min(2, "Too short").max(20, "Too long")),
});