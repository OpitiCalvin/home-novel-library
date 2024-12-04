import { User } from "@/database/models";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (!credentials) return null;

        const user = await User.findOne({
          where: {
            email: credentials.email.toLowerCase(),
          },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        });
        if (!user) {
          console.error("User not found!");
          return null;
        }
        const isPasswordMatch = await bcrypt.compare(
          credentials.password || "",
          user.password
        );
        // console.log({isPasswordMatch})
        if (!isPasswordMatch) {
          return null;
        }
        return { id: user.id, email: user.email } as User;
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
        token.email = user.email;
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

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
