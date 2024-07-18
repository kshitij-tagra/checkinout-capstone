import Credentials from "next-auth/providers/credentials";
import { validate } from "../app/_utils/authUtils";
import NextAuth, { CredentialsSignin } from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/pages/login",
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      name: "Email",
      credentials: {
        name: {
          label: "email",
          type: "email",
          placeholder: "Enter your name",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;

        const validationRes = await validate(email, password);

        if (!validationRes.success) {
          throw new CredentialsSignin(validationRes.message);
        }

        return validationRes.user;
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      session.user = { ...session.user, ...token.user };
      return session;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = { ...token.user, ...user };
      }
      return token;
    },
  },
});
