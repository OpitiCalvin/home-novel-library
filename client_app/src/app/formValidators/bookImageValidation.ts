import { zfd } from "zod-form-data";
import {z} from "zod";

const MAX_FILE_SIZE = 50000000;

export const bookImageFormSchema = zfd.formData({
  bookId: zfd.numeric(z.number().int().min(1, {message:"A book is required"}).positive({message: "Bood ID must be a positive number"})),
  coverImages: z.any()
    .refine((files:FileList) => files && Array.from(files).length >= 1, "At least 1 File is required")
    .refine((files:FileList) => Array.from(files).every((file: File) => file.size <= MAX_FILE_SIZE), 'Max image size is 5MB.')
    .refine((files:FileList) => Array.from(files).every((file: File) => file.type.startsWith('image/')), "Only image files are allowed"),
});