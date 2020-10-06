import config from "./config";
import express from "express";

const app = express();

app.listen(config.port);

console.log(`Server is running at http://localhost:${config.port}`);
