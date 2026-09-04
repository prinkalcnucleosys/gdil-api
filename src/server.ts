import "dotenv/config";

import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import investorRoutes from "./routes/investor.routes";
import contactRoutes from "./routes/contact.routes";
import blogRoutes from "./routes/blog.routes";
import authRoutes from "./routes/auth.routes";
import investorSubCategoryRoutes from "./routes/investor-subcategory.routes";
import investorTableFormatRoutes from "./routes/investor-table-format.routes";

import { swaggerSpec } from "./config/swagger";

const app = express();

const PORT =
  Number(process.env.PORT) || 5000;

/*
|--------------------------------------------------------------------------
| MIDDLEWARE
|--------------------------------------------------------------------------
*/

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(
  express.json(),
);

app.use(
  express.urlencoded({
    extended: true,
  }),
);

/*
|--------------------------------------------------------------------------
| SWAGGER
|--------------------------------------------------------------------------
*/

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(
    swaggerSpec,
  ),
);

/*
|--------------------------------------------------------------------------
| HEALTH CHECK
|--------------------------------------------------------------------------
*/

app.get(
  "/",
  (_req, res) => {
    res.json({
      success: true,
      message:
        "GDIL API is running",
    });
  },
);

/*
|--------------------------------------------------------------------------
| AUTHENTICATION
|--------------------------------------------------------------------------
*/

app.use(
  "/api/auth",
  authRoutes,
);
app.use(
  "/api/contact",
  contactRoutes,
);

/*
|--------------------------------------------------------------------------
| INVESTOR RELATIONS
|--------------------------------------------------------------------------
*/

app.use(
  "/api/investor",
  investorRoutes,
);

app.use("/api/blog", blogRoutes);

app.use(
  "/api/investor/admin/subcategories",
  investorSubCategoryRoutes,
);

app.use(
  "/api/investor/admin/table-formats",
  investorTableFormatRoutes
);

/*
|--------------------------------------------------------------------------
| 404
|--------------------------------------------------------------------------
*/

app.use(
  (_req, res) => {
    res.status(404).json({
      success: false,
      message:
        "Route not found",
    });
  },
);

/*
|--------------------------------------------------------------------------
| START SERVER
|--------------------------------------------------------------------------
*/

app.listen(
  PORT,
  () => {
    console.log(
      `GDIL API running at http://localhost:${PORT}`,
    );

    console.log(
      `Swagger UI running at http://localhost:${PORT}/api-docs`,
    );
  },
);