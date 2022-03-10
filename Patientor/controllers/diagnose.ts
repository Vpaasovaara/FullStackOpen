import express from "express";
const diagnoses: Array<diagnose> = require('../data/diagnoses.json');
const diagnoseRouter = express.Router();

type diagnose = {
    code: String,
    name: String,
    latin?: String
};

diagnoseRouter.get('/', (_req: any, res: { json: (arg0: diagnose[]) => void }) => {
    res.json(diagnoses);
});


export default diagnoseRouter;