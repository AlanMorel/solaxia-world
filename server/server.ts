import config from "./config";
import express from "express";
import staticAssets from "./core/static";
import handlebars from "./core/handlebars";
import router from "./core/router";

const app = express();
staticAssets(app);
handlebars(app);
router(app);

app.listen(config.port);

console.log(`Server is running at http://localhost:${config.port}`);
