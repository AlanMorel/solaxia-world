import handlebars from "express-handlebars";
import { Application } from "express";

export default (app: Application): void => {
    app.engine("handlebars", handlebars());
    app.set("view engine", "handlebars");
    app.set("views", __dirname);
};
