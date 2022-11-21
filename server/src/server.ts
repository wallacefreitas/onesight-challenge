import Fastify from "fastify";
import cors from "@fastify/cors";

import { itemRoutes } from "./routes/items";

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  })

  await fastify.register(cors, {
    origin: true
  })

  await fastify.register(itemRoutes);

  await fastify.listen({ port: 3333, host: '0.0.0.0' })
}

bootstrap();