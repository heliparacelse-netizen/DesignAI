import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";

const googleEnabled = process.env.NEXT_PUBLIC_GOOGLE_ENABLED === "true";
const appleEnabled = process.env.NEXT_PUBLIC_APPLE_ENABLED === "true";

const providers: NextAuthOptions["providers"] = [
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) return null;
      return {
        id: `user-${credentials.email}`,
        email: credentials.email,
        name: credentials.email.split("@")[0],
        plan: "free",
        tokens: 4,
      } as any;
    },
  }),
];

if (googleEnabled && process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  );
}

if (appleEnabled && process.env.APPLE_ID && process.env.APPLE_SECRET) {
  providers.push(
    AppleProvider({
      clientId: process.env.APPLE_ID,
      clientSecret: process.env.APPLE_SECRET,
    })
  );
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },
  jwt: {
    maxAge: 7 * 24 * 60 * 60,
  },
  providers,
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.userId = (user as any).id;
        token.plan = (user as any).plan ?? "free";
        token.tokens = (user as any).tokens ?? 4;
      }
      if (trigger === "update" && session) {
        token.plan = (session as any).plan ?? token.plan;
        token.tokens = (session as any).tokens ?? token.tokens;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.userId;
        (session.user as any).plan = token.plan;
        (session.user as any).tokens = token.tokens;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
