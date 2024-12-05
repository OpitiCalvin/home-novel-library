import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "@/dal/users";

interface ExtendedUser extends User {
  role?: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (!credentials) return null;

        const user = await loginUser(credentials.email, credentials.password);

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: { strategy: "jwt", maxAge: 2 * 60 * 60 },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
      }
      if (user) {
        const extUser: ExtendedUser = user;
        token.email = user.email;
        token.id = user.id;
        token.role = extUser.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token;
      }
      // session.user = token as any;
      return session;
    },
  },
};
