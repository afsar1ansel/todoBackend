const express = require("express");
const dbConnect = require("./db");
const userRouter = require("./routes/userRouter");
const noteRouter = require("./routes/noteRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

// Swagger docs setup
const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Todo Backend",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:7777",
      },
    ],
  },
  apis: ["index.js", "./routes/userRouter.js", "./routes/noteRoutes.js"],
};

const openapiSpecification = swaggerJsdoc(options);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

// Express app setup
app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json());
app.use(cookieParser("token"));
app.use("/user", userRouter);
app.use("/note", noteRouter);

// Root endpoint
app.get("/", (req, res) => {
  res.send("hello world");
});

// Server start
app.listen(7777, async () => {
  await dbConnect();
  console.log("Server is running on port 7777");
});
