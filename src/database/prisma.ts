import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
    log: process.env.NODE_ENV === "production" ? [] : ["query"]
})

// import { PrismaClient } from '@prisma/generated/prisma'

// const prisma = new PrismaClient()
// // use `prisma` in your application to read and write data in your DB