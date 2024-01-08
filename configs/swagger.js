const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0", // Specify the OpenAPI version
    info: {
      title: "Final-Project API Doc",
      version: "1.1.0",
      description: "API Doc for Room Reservation System",
    },
    components: {
      securitySchemes: {
        Authorization: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          value: "Bearer <JWT token here>",
        },
      },
    },
    servers: [
      {
        url: "http://localhost:5000/",
      },
      {
        url: "http://54.169.85.51:5000/",
      },
    ],
  },
  // Paths to API docs and output format
  apis: ["routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerSpec };
