import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

const fastifyCacheControl = fp(async (app: FastifyInstance) => {
  app.addHook('onSend', async (req, reply) => {
    reply.header('Cache-Control', 'no-store');
    reply.header('Pragma', 'no-cache');
  });
});

export { fastifyCacheControl };
