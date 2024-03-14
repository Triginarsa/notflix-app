import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prismadb from "@/lib/prismadb"; // Import your Prisma client
import { compare } from "bcrypt";

async function authorize(credentials: { email?: string; password?: string }) {
  if (!credentials?.email || !credentials?.password) {
    throw new Error("Email and password are required");
  }

  const user = await prismadb.user.findUnique({
    where: {
      email: credentials.email,
    },
  });

  if (!user || !user.hashedPassword) {
    throw new Error("Email does not exist");
  }

  const isCorrectPassword = await compare(
    credentials.password,
    user.hashedPassword
  );

  if (!isCorrectPassword) {
    throw new Error("Password is incorrect");
  }

  return user;
}

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prismadb),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: (credentials = { email: "", password: "" }, req) =>
        authorize(credentials),
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
