import config from "../config";
import express, { Application } from "express";

const staticOptions = {
    fallthrough: false
};

export default (app: Application): void => {
    app.use("/dist", express.static(__dirname + "../dist/" + config.env, staticOptions));
    app.use("/assets", express.static(__dirname + "../client/assets", staticOptions));
};
