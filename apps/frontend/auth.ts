import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { addUser } from "./lib/users-api";

const googleId = process.env.GOOGLE_CLIENT_ID;
const googleSecret = process.env.GOOGLE_CLIENT_SECRET;
const nextAuthSecret = process.env.NEXTAUTH_SECRET;

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: googleId!,
      clientSecret: googleSecret!,
    }),
  ],
  secret: nextAuthSecret!,
  callbacks: {
    async signIn({ user }) {
      const response = await addUser({
        name: user.name ?? "",
        email: user.email ?? "",
        image: user.image ?? undefined,
        provider: "google",
      });
      if (response.status !== 200) {
        return false;
      }
      return true;
    },
  },
});
