import { NextAuthOptions, User} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "@/dal/users";

interface ExtendedUser extends User {
  role: string;
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
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = user.id;
        token.role = (user as ExtendedUser).role;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role
      return session;
    },
  },
};
