import bcrypt from "bcryptjs"
import { Service } from "typedi"

import { UserWhereInput } from "@generated"

import { createAuthToken, createRefreshToken } from "../../lib/jwt"
import { prisma } from "../../lib/prisma"
import { LoginInput } from "./inputs/login.input"
import { RegisterInput } from "./inputs/register.input"
import { GenerateInput } from "./inputs/generate.input"
import { RefreshTokenResponse } from "./responses/refreshToken.response"
import { User } from "./user.model"
import { AppError } from "../../lib/appError"

@Service()
export class UserService {
    async login(data: LoginInput): Promise<User> {
        const user = await prisma.user.findUnique({ where: { email: data.email } })
        if (!user) throw new AppError("Incorrect email or password")
        const isValidPassword = await bcrypt.compare(data.password, user.password)
        if (!isValidPassword) throw new AppError("Incorrect email or password")
        return user
    }

    async register(data: RegisterInput) {
        const email = data.email.toLowerCase().trim()

        // TODO: Do we want to just register this new account and disregard the ID passed in? Currently we stop the
        //       registration from going through... maybe this is a client-side prompt
        await this.checkUserExists({ 
            OR: [
                // If we have an ID, let see if that account is already setup
                ...data.id ? [{ id:  { equals: data.id }, email: { contains: '@' } }] : [],
                
                // Or if email exists
                { email: { equals: email }}
            ]
        })
        
        // We have an ID with this request... check if user setup
        // if (data.id) {
        //     let existingUser = await prisma.user.findFirst({ where: { id: data.id }})
        //     if (existingUser?.email) throw new AppError("User with these details already exists")
        // }

        const user = await prisma.user.upsert({ where: { id: data.id }, create: data, update: data })
        return user
    }

    async generate(data: GenerateInput) {
        return await prisma.user.create({ data })
    }

    async checkUserExists(where: UserWhereInput) {
        const user = await prisma.user.findFirst({ where })
        if (user) {
            throw new AppError("It looks like you may already have an account")
        }
    }

    createAuthTokens(user: User): RefreshTokenResponse {
        const token = createAuthToken({ id: user.id })
        const refreshToken = createRefreshToken({ id: user.id })
        return { token, refreshToken }
    }
}
