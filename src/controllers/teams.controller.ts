import { Request, Response } from "express";
import z, { includes } from "zod";
import { prisma } from "../database/prisma";

export class TeamsController {
    async create(request: Request, response: Response) {
        const bodySchema = z.object({
            name: z.string().min(3),
            description: z.string().optional()
        })

        const { name, description } = bodySchema.parse(request.body)

        const team = await prisma.team.create({ data: { name, description: description ? description : "" } })

        return response.status(201).json(team)
    }
    
    async index(request: Request, response: Response) {
        const teams = request.user?.role === 'admin'
        ? await prisma.team.findMany()
        : await prisma.team.findMany({
            where: {
                teamMembers: {
                    some: {
                        userId: request.user?.id
                    }
                }
            }
        })


        return response.status(200).json(teams)
    }
    
    async update(request: Request, response: Response) {
        const paramsSchema = z.object({
            id: z.string()
        })

        const { id} = paramsSchema.parse(request.params)

        const bodySchema = z.object({
            name: z.string().min(3).optional(),
            description: z.string().optional()
        })

        const dataUpdate = bodySchema.parse(request.body)

        const teamUpdated = await prisma.team.update({ 
            data: dataUpdate, 
            where: {id} 
        }) 

        return response.status(200).json(teamUpdated)
    }
}