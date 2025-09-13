import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { authConfig } from "../configs/auth";
import { verify } from "jsonwebtoken";

type TokenPayload = {
    role: string
    subject: string
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    try {
        const authHeader = request.headers.authorization

        if (!authHeader) {
            throw new AppError("JWT token not found", 401)
        }
        
        const [, token] = authHeader.split(" ")

        const { role, subject: user_id } = verify(token, authConfig.jwt.secret) as TokenPayload

        if (!user_id) {
            throw new AppError("Invalid JWT token", 401)
        }

        // Adiciona o user na requisição
        request.user = {
            id: user_id,
            role,
        }

        return next()

    } catch (error) {
        throw new AppError("Invalid JWT token", 401)
    }
}