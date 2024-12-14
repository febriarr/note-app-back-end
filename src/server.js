const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();

/**
 * utes: { cors: { origin: ['*'], // Allow all origins headers: ['Authorization'], // Allow specific headers exposedHeaders: ['Accept'], // Expose specific headers additionalExposedHeaders: ['Accept'], // Additional exposed headers maxAge: 60, // Cache duration in seconds credentials: true // Allow credentials } } });
 */
