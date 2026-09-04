import swaggerJsdoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.3",

  info: {
    title: "GDIL Backend API",
    version: "1.0.0",
    description:
      "REST API documentation for the GDIL website backend.",
  },

  servers: [
    {
      url: "http://localhost:5000",
      description: "Local Development Server",
    },
  ],

  tags: [
    {
      name: "Investor Categories",
      description:
        "Investor Relations category management",
    },
    {
      name: "Investor Documents",
      description:
        "Investor document and Google Drive link management",
    },
    {
      name: "Public Investor",
      description:
        "Public Investor Relations endpoints used by the GDIL React frontend",
    },
  ],

  components: {
  securitySchemes: {
    BearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },

    schemas: {
      InvestorCategoryInput: {
        type: "object",

        required: [
          "name",
          "slug",
        ],

        properties: {
          name: {
            type: "string",
            example: "Annual Reports",
          },

          slug: {
            type: "string",
            example: "annual-reports",
          },

          description: {
            type: "string",
            nullable: true,
          },

          isActive: {
            type: "boolean",
            example: true,
          },

          sortOrder: {
            type: "integer",
            example: 1,
          },
        },
      },

      InvestorDocumentInput: {
        type: "object",

        required: [
          "categoryId",
          "title",
          "externalUrl",
        ],

        properties: {
          categoryId: {
            type: "integer",
            example: 1,
          },

          title: {
            type: "string",
            example: "Annual Report 2025-26",
          },

          financialYear: {
            type: "string",
            nullable: true,
            example: "2025-26",
          },

          quarter: {
            type: "string",
            nullable: true,
            example: "Quarter 4",
          },

          documentDate: {
            type: "string",
            format: "date-time",
            nullable: true,
            example: "2026-05-29T00:00:00.000Z",
          },

          disclosureDate: {
            type: "string",
            format: "date-time",
            nullable: true,
          },

          dueDate: {
            type: "string",
            format: "date-time",
            nullable: true,
          },

          description: {
            type: "string",
            nullable: true,
          },

          purpose: {
            type: "string",
            nullable: true,
          },

          documentType: {
            type: "string",
            nullable: true,
            example: "Annual Report",
          },

          externalUrl: {
            type: "string",
            format: "uri",
            example:
              "https://drive.google.com/file/d/FILE_ID/view",
          },

          isPublished: {
            type: "boolean",
            example: true,
          },

          sortOrder: {
            type: "integer",
            example: 1,
          },
        },
      },

      UpdateInvestorDocument: {
        type: "object",

        properties: {
          categoryId: {
            type: "integer",
            example: 1,
          },

          title: {
            type: "string",
            example: "Annual Report 2025-26",
          },

          financialYear: {
            type: "string",
            nullable: true,
            example: "2025-26",
          },

          quarter: {
            type: "string",
            nullable: true,
            example: "Quarter 4",
          },

          documentDate: {
            type: "string",
            format: "date-time",
            nullable: true,
          },

          disclosureDate: {
            type: "string",
            format: "date-time",
            nullable: true,
          },

          dueDate: {
            type: "string",
            format: "date-time",
            nullable: true,
          },

          description: {
            type: "string",
            nullable: true,
          },

          purpose: {
            type: "string",
            nullable: true,
          },

          documentType: {
            type: "string",
            nullable: true,
          },

          externalUrl: {
            type: "string",
            format: "uri",
            example:
              "https://drive.google.com/file/d/FILE_ID/view",
          },

          isPublished: {
            type: "boolean",
            example: true,
          },

          sortOrder: {
            type: "integer",
            example: 1,
          },
        },
      },
    },
  },
};

const options = {
  definition: swaggerDefinition,

  apis: [
    "./src/routes/*.ts",
  ],
};

export const swaggerSpec =
  swaggerJsdoc(options);