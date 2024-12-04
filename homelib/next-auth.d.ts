import { User } from "@/database/models";
// import "next-auth"
// import { string } from "zod";

declare module "next-auth/providers/credentials" {
  interface User {
    email: string;
    name: string;
    access_token: string;
    refresh_token: string;
    expires_on: number;
    exp: number;
    iat: number;
    jti: string;
  }

  interface Session extends DefaultSession {
    user: User;
    expires_in: string;
    error: string;
  }
  interface Credentials {
    email: string;
    password: string;
  }

  export default function CredentialsProvider(options: {
    name: string;
    credentials: Record<string, any>;
    authorize?: (credentials: Credentials) => Promise<any | null>;
  }): any;
}

// declare module "next-auth/providers/credentials" {
//   interface Credentials {
//     email: string;
//     password: string;
//   }

//   export default function CredentialsProvider(options: {
//     name: string;
//     credentials: Record<string, any>;
//     authorize?: (credentials: Credentials) => Promise<any | null>;
//   }): any;
// }