import { Request, Response } from "express";
import z from "zod";
import { prisma } from "../database/prisma";

export class TeamMembersController {
    async create(request: Request, response: Response) {
        const paramsSchema = z.object({
            id: z.string()
        })
        const { id: teamId } = paramsSchema.parse(request.params)

        const bodySchema = z.object({
            usersId: z.array(z.uuid())
        })

        const { usersId } = bodySchema.parse(request.body)

        // const teamMembers = usersId.forEach(id => async () => {
        //     await prisma.teamMember.create({ data: {
        //         teamId,
        //         userId: id
        //     } })            
        // });

        // return response.status(201).json(teamMembers)

        const results = await Promise.allSettled(
            usersId.map(id =>
                prisma.teamMember.create({
                    data: {
                        teamId,
                        userId: id
                    }
                })
            )
        );

        const successes = results
        .filter(result => result.status === "fulfilled")
        .map(result => (result as PromiseFulfilledResult<any>).value);

        const failures = results
        .filter(result => result.status === "rejected")
        .map((result, index) => ({
            userId: usersId[index],
            error: (result as PromiseRejectedResult).reason.message || "Erro desconhecido"
        }));

        return response.status(201).json({
            created: successes.length,
            failures: failures.length,
            createdMembers: successes,
            erros: failures
        });

    }
    
    async remove(request: Request, response: Response) {
        const paramsSchema = z.object({
            id: z.string()
        })
        const { id: teamId } = paramsSchema.parse(request.params)

        const bodySchema = z.object({
            usersId: z.array(z.uuid())
        })

        const { usersId } = bodySchema.parse(request.body)

        const results = await Promise.allSettled(
            usersId.map(id =>
                prisma.teamMember.deleteMany({
                    where: {
                        teamId, 
                        userId: id
                    }
                })
            )
        );

        // return response.json()
        const successes = results.filter(r => r.status === "fulfilled");
        const failures = results
        .filter(r => r.status === "rejected")
        .map((r, i) => ({
            userId: usersId[i],
            error: (r as PromiseRejectedResult).reason.message || "Erro desconhecido"
        }));

        return response.status(200).json({
        removidos: successes.length,
        falhas: failures.length,
        erros: failures
        });
    }
}