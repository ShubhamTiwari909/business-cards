import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { addUser } from "./lib/users-api";

const googleId = process.env.GOOGLE_CLIENT_ID;
const googleSecret = process.env.GOOGLE_CLIENT_SECRET;
const nextAuthSecret = process.env.NEXTAUTH_SECRET;
const internalSecret = process.env.INTERNAL_SECRET;

if (!googleId || !googleSecret || !nextAuthSecret || !internalSecret) {
  throw new Error(
    "Missing required environment variables for authentication.",
  );
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: googleId,
      clientSecret: googleSecret,
    }),
  ],
  secret: nextAuthSecret,
  session: {
    strategy: "jwt", // encrypted JWE, not plain JWT
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  callbacks: {
    async signIn({ user }) {
      try {
        const response = await addUser({
          name: user.name ?? "",
          email: user.email ?? "",
          image: user.image ?? undefined,
          provider: "google",
        }, internalSecret);
        if (response.status !== 200) {
          return false;
        }
        user.accessToken = response.data.accessToken
        return true;
      } catch (error) {
        console.error("Failed to add user during sign in:", error);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user?.accessToken) {
        token.accessToken = user.accessToken // persist into encrypted NextAuth cookie
      }
      return token
    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken as string // expose to frontend via useSession()
      return session
    },
  },
});
