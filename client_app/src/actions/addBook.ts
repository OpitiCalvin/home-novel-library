"use server"

import { ZodError } from "zod";
import { bookFormSchema } from "../formValidators/addBookValidation";
import { State } from "../formValidators/formStates";
import { apiURI } from "@/api/apiFetcher";

export async function processAddBook(prevState: State | null, data: FormData): Promise<State> {
    try {
        // validate data
        const obj = bookFormSchema.parse(data);
    
        // console.log("server action", data)
        // console.log("parsed data", obj)

        const { message } = await apiURI.post("books", obj).then(res => res.data)
        return {
            status: "success",
            message: message
        }
    
    } catch (e) {
        // In case of a ZodError (caused by our validation) we're adding issues to our response
        if (e instanceof ZodError) {
            return {
                status: "error",
                message: "Invalid form data",
                errors: e.issues.map((issue) => ({
                    path: issue.path.join("."),
                    message: `Server validation: ${issue.message}`
                }))
            }
        }
        return {
            status: "error",
            message: "Something went wrong. Please try again"
        }
    }
}