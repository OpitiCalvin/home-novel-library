"use server"

import { ZodError } from "zod";
import { genreFormSchema } from "../formValidators/addGenreValidation";
import { State } from "../formValidators/formStates";
import { apiURI } from "@/api/apiFetcher";

interface GenreResponse {
    message: string; 
    genre: {
        id: number;
        name: string; 
        updatedAt: string; 
        createdAt: string;
    }
}

export async function processAddGenre(prevState: State | null, data: FormData): Promise<State> {
    try {
        // validate data
        const obj = genreFormSchema.parse(data);

        const resp: GenreResponse = await apiURI.post("genres",obj).then((res) => res.data
        )
        // console.log("resp", resp);
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