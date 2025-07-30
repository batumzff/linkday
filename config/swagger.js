const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'LinkDay API',
      version: '1.0.0',
      description: 'A Linktree-like API for managing personal link collections',
      contact: {
        name: 'LinkDay API Support',
        email: 'support@linkday.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Docker development server'
      },
      {
        url: 'http://localhost:5000',
        description: 'Local development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'User ID'
            },
            name: {
              type: 'string',
              description: 'User full name',
              example: 'John Doe'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
              example: 'john@example.com'
            },
            username: {
              type: 'string',
              description: 'Unique username',
              minLength: 3,
              maxLength: 30,
              example: 'johndoe'
            },
            avatar: {
              type: 'string',
              description: 'Avatar URL',
              example: 'https://example.com/avatar.jpg'
            },
            bio: {
              type: 'string',
              maxLength: 160,
              description: 'User bio',
              example: 'Software developer passionate about technology'
            },
            theme: {
              type: 'string',
              enum: ['light', 'dark', 'colorful'],
              description: 'Profile theme',
              example: 'light'
            },
            isActive: {
              type: 'boolean',
              description: 'User account status',
              example: true
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Account creation date'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update date'
            }
          }
        },
        Link: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Link ID'
            },
            userId: {
              type: 'string',
              description: 'Owner user ID'
            },
            title: {
              type: 'string',
              maxLength: 100,
              description: 'Link title',
              example: 'My Portfolio'
            },
            url: {
              type: 'string',
              format: 'uri',
              description: 'Link URL',
              example: 'https://johndoe.dev'
            },
            description: {
              type: 'string',
              maxLength: 300,
              description: 'Link description',
              example: 'Check out my latest projects'
            },
            icon: {
              type: 'string',
              description: 'Link icon URL or name',
              example: 'portfolio'
            },
            order: {
              type: 'number',
              description: 'Display order',
              example: 0
            },
            clicks: {
              type: 'number',
              description: 'Click count',
              example: 42
            },
            isActive: {
              type: 'boolean',
              description: 'Link status',
              example: true
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation date'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update date'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            message: {
              type: 'string',
              example: 'Error message'
            }
          }
        },
        Success: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            message: {
              type: 'string',
              example: 'Operation successful'
            }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./routes/*.js', './controllers/*.js']
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs
};