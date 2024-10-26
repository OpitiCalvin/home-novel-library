"use server"

import { ZodError } from "zod";
import { formSchema } from "../utils/addBookValidation";

export type State = 
| {
    status: "success"
    message: string;
}
| {
    status: "error";
    message: string;
    errors?:Array<{
        path: string;
        message: string
        }>;
    }
| null;

export async function processAddBook(prevState: State | null, data: FormData): Promise<State> {
    try {
        // artificial delay; don't forget to remove 
        await new Promise ((resolve) => setTimeout(resolve, 1000));

        // validate data
        formSchema.parse(data);

        console.log("server action", data)

        return {
            status: "success",
            message: "Book added"
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