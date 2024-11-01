"use server"

import { ZodError } from "zod";
import { authorFormSchema } from "../formValidators/addAuthorValidation";
import { State } from "../formValidators/formStates";
import { apiURI } from "@/api/apiFetcher";

interface AuthorResponse {
    message: string;
    author: {
        id: number;
        name: string;
        bio: string;
        updatedAt: string; 
        createdAt: string;
    }
}
export async function processAddAuthor(prevState: State | null, data: FormData): Promise<State> {
    try {
        // validate data
        const obj = authorFormSchema.parse(data)

        const resp: AuthorResponse = await apiURI.post("authors", obj).then(res => res.data)
        return {
            status: "success",
            message: resp.message
        }
        
    } catch (e) {
        if (e instanceof ZodError){
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