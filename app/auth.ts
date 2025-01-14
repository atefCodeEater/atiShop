import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import Google from "next-auth/providers/google"
import { db } from "./db"
import Credentials from "next-auth/providers/credentials"

const prisma = new PrismaClient()

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
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
      let user = null

      user = await db.user.findUnique({ where: { email: credentials.email as string } })
      console.log("USER IN AUTH : ", user);

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
  secret: 'atef'

})