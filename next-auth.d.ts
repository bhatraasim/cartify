import { DefaultSession } from "next-auth"

declare module "next-auth" {
    interface Session {
        user:{
            id:string,
            isAdmin: boolean // ADD THIS LINE

        } & DefaultSession["user"]
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string
        isAdmin: boolean // ADD THIS INTERFACE
    }
}