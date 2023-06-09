import express, { json } from "express";
import pkg from "morgan";
import bookRoutes from "./routes/book.js";
import userRoutes from "./routes/user.js";
import { serverRun } from "./constants.js";

const app = express();
app.use(json());
app.use(pkg("combined"));

//ROUTES
app.use("/api/v1/book", bookRoutes);
app.use("/api/v1/auth", userRoutes);

app.listen(3000, () => console.log(serverRun));
