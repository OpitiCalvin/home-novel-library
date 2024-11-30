"use server"

import { ZodError } from "zod";
import { authorFormSchema } from "../formValidators/addAuthorValidation";
import { State } from "../formValidators/formStates";

export async function processAddAuthor(prevState: State | null, data: FormData): Promise<State> {
    try {
        // validate data
        const obj = authorFormSchema.parse(data)

        const {message} = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/authors`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        }).then(res => res.json())
        return {
            status: "success",
            message: message
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