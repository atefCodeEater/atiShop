import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import Google from "next-auth/providers/google"
import { db } from "./db"
import Credentials from "next-auth/providers/credentials"
import { revalidatePath } from "next/cache"



const prisma = new PrismaClient()

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },

  providers: [Google({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,


  }),
  Credentials({
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    credentials: {
      email: { label: 'email', type: "text" },
      password: { label: 'password', type: "text" },
    },
    authorize: async (credentials) => {

      console.log("USER IN AUTH : ", credentials);

      var user = await db.user.findUnique({ where: { email: credentials.email as string } })

      if (!user) {
        // No user found, so this is their first attempt to login
        // Optionally, this is also the place you could do a user registration
        throw new Error("Invalid credentials.")
      }

      // return user object with their profile data
      return user

    },
  }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) { // User is available during sign-in
        token.id = user.id
        const User = await db.user.findUnique({ where: { id: user.id } })
        token.isAdmin = User?.isAdmin || false
      }
      return token
    },
    async session({ session, token }: { session: any, token: any }) {
      session.user.id = token.id
      session.user.isAdmin = token.isAdmin;
      return session
    },
  },


  secret: process.env.AUTH_SECRET

})