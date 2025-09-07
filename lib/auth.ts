import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import bcrypt from "bcryptjs";
import User from "@/model/User";
import { connectToDatabase } from "./db";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password ");
        }

        try {
          await connectToDatabase();
          const user = await User.findOne({ email: credentials.email });
          if (!user) return null;

          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isValid) return null;

          return {
            id: user._id.toString(),
            email: user.email,
          };
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google")  {
        try {
          await connectToDatabase();
          const existingUser = await User.findOne({ email: user.email });


          if (!existingUser) {
            const newUser = await User.create({
              name: user.name,
              email: user.email,
              image: user.image,
              password: await bcrypt.hash(
                Math.random().toString(36).slice(-8),
                10
              ),
            });
            // Update the user object with the MongoDB ID
            user.id = newUser._id.toString();
          } else {
            // Set the user ID to the existing MongoDB user ID
            user.id = existingUser._id.toString();
          }
        } catch (error) {
          console.error("Google sign-in error:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.sub = user.id;
        token.email = user.email;
        
        token.isAdmin = user.email === process.env.ADMIN_EMAIL;

        // ADD THESE DEBUG LINES TEMPORARILY
        console.log('User email:', user.email);
        console.log('Admin email from env:', process.env.ADMIN_EMAIL);
        console.log('Is admin:', token.isAdmin);
      
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;

        session.user.isAdmin = token.isAdmin || false;

        // ADD THIS DEBUG LINE TEMPORARILY
    console.log('Session isAdmin:', session.user.isAdmin);
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
