import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET || 'xK9#mP2$vL5nQ8wR3jY6uA1sD4hF7tG0',
  providers: [
    CredentialsProvider({
      name: 'Email',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        return {
          id: '1',
          email: credentials.email,
          name: credentials.email.split('@')[0],
        };
      }
    }),
  ],
  pages: { signIn: '/login' },
  session: { strategy: 'jwt' as const },
};

export default NextAuth(authOptions);
