import { Application } from "express";

import MainController from "../controllers/MainController";

export default (app: Application): void => {
    app.get("*", MainController);
};
