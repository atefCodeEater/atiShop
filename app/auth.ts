import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import Google from "next-auth/providers/google"
import { db } from "./db"

 
const prisma = new PrismaClient()
 
export const { auth, handlers, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(db),
providers:[Google({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    
    
})],
  secret:'atef'

})