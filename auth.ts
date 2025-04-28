import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // validation
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // test data
        if (
          credentials.email === "admin@test.com" &&
          credentials.password === "123456"
        ) {
          return {
            id: "1",
            name: "Admin User",
            email: "admin@test.com",
            role: "admin",
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login", // redirect to loginPage if the user doens't logged in
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add role to token
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      // Add role to session
      if (token?.role && session.user) {
        (session.user as any).id = token.id; 
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
});
