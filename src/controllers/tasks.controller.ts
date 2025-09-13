import { Request, Response } from 'express';
import z from 'zod';
import { prisma } from '../database/prisma';

export class TasksController {
    async create(request: Request, response: Response) {
        const bodySchema = z.object({
            title: z.string(),
            description: z.string(),
            status: z.enum(['pending', 'in_progress', 'completed']).optional(),
            priority: z.enum(['low', 'medium', 'high']),
            assignedTo: z.uuid()
        });
           
        const paramsSchema = z.object({
            teamId: z.uuid(),
        });

        const { title, description, priority, status, assignedTo } = bodySchema.parse(request.body);

        const { teamId } = paramsSchema.parse(request.params);

        if (!request.user?.id) {
            throw new Error("Usuário não autenticado");
        }

        const task = await prisma.task.create({
            data: {
                title,
                description,
                priority,
                status: status || 'pending',
                teamId,
                assignedTo,
            }
        });

        response.status(201).json({ task });
    }

    async show(request: Request, response: Response) {
        const paramsSchema = z.object({
            id: z.uuid(),
        });

        const { id } = paramsSchema.parse(request.params);

        const task = await prisma.task.findUnique({
            where: { id },
        });

        response.status(200).json({ task });
    }

    async list(request: Request, response: Response) {
        const tasks = request.user?.role === 'admin'
        ? await prisma.task.findMany()
        : await prisma.task.findMany({
            where: {
                assignedTo: request.user?.id
            }
        })

        response.status(200).json({ tasks });
    }

    async update(request: Request, response: Response) {
        const paramsSchema = z.object({
            id: z.uuid(),
        });
        const { id } = paramsSchema.parse(request.params);

        if ("admin" !== request.user?.role) {
            //throw new Error("Apenas administradores podem atualizar tarefas.");
            const task = await prisma.task.findUnique({
                where: { id },
            });

            task?.assignedTo !== request.user?.id &&
                (() => { throw new Error("Apenas administradores podem atualizar tarefas de outros membros."); })()
        }

        const bodySchema = z.object({
            title: z.string().optional(),
            description: z.string().optional(),
            status: z.enum(['pending', 'in_progress', 'completed']).optional(),
            priority: z.enum(['low', 'medium', 'high']).optional(),
            assignedTo: z.uuid().optional(),
        });

        const dataUpdate = bodySchema.parse(request.body);

        const task = await prisma.task.update({
            where: { id },
            data: dataUpdate,
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            }
        });

        response.status(200).json({ task });
    }

    async remove(request: Request, response: Response) {
        const paramsSchema = z.object({
            id: z.uuid(),
        });
        const { id } = paramsSchema.parse(request.params);

        await prisma.task.delete({ where: { id } });

        response.status(204).json();
    }
}