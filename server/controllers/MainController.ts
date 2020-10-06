import { Request, Response } from "express";

const app = {
    slug: "solaxia-world",
    name: "Solaxia World",
    domain: "solaxia.world"
};

const metaInfo = {
    title: "Solaxia World",
    description: "Solaxia World",
    image: "image"
};

export default (req: Request, res: Response): void => {

    res.render("main", {
        layout: false,
        app,
        metaInfo,
        path: req.path
    });
};
