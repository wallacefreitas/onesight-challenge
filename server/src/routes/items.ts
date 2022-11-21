import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function itemRoutes(fastify: FastifyInstance) {
  fastify.get('/items/:id', {}, async (request) => {
    const getPoolParams = z.object({
      id: z.string()
    })

    const { id } = getPoolParams.parse(request.params);

    const item = await prisma.items.findUnique({
      where: {
        id
      }
    })

    return { 
      item
    }
  })

  fastify.get('/items', {}, async (request) => {
    const items = await prisma.items.findMany()

    return { 
      items
    }
  })

  fastify.post('/items', async (request, reply) => {
    const createItemBody = z.object({
      title: z.string(),
      description: z.string(),
      quantity: z.number(),
      price: z.number(),
    });

    const { title, description, quantity, price } = createItemBody.parse(request.body);

    await prisma.items.create({
      data: {
        title,
        description,
        quantity,
        price
      }
    })

    return reply.status(200).send();
  })

  fastify.put('/items/:id', async (request, reply) => {
    const createItemBody = z.object({
      title: z.string(),
      description: z.string(),
      quantity: z.number(),
      price: z.number(),
    });

    const createItemParams = z.object({
      id: z.string(),
    })

    const { title, description, quantity, price } = createItemBody.parse(request.body);
    const { id } = createItemParams.parse(request.params);

    await prisma.items.update({
      where: { id },
      data: {
        title,
        description,
        quantity,
        price
      }
    })

    return reply.status(200).send();
  })

  fastify.delete('/items/:id', async (request, reply) => {
    const createItemParams = z.object({
      id: z.string(),
    })

    const { id } = createItemParams.parse(request.params);

    await prisma.items.delete({
      where: { id }
    })

    return reply.status(200).send();
  })
}