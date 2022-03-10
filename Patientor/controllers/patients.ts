import express from "express";
import { v4 as uuidv4 } from 'uuid';
import patients from '../data/patients';
import { Patient, Entry } from "../patientor-frontend/src/types";
const patientRouter = express.Router();

type filteredPatient = Omit<Patient, 'ssn' | 'entries'>;

patientRouter.get('/', (_req: any, res: { json: (arg0: filteredPatient[]) => void }) => {
    const message: Array<filteredPatient> = [...patients].map((patient: filteredPatient) => {
        let res: any = { ...patient };
        delete res['ssn'];
        return res;
    });

    try {
        res.json(message);
    } catch (err) {
        console.log(err);
    }
})

patientRouter.post('/', (req, res) => {
    const id: string = uuidv4();

    const newPatient: Patient = { 
        id: id,
        ...req.body
    };

    try {
        patients.push(newPatient);
        res.send(newPatient);
    } catch (err) {
        console.log(err);
    }
})

patientRouter.get('/:id', (req, res) => {
    let id: string = req.params.id;
    let payload: any = patients.find((patient: Patient) => {
        return patient.id === id;
    })

    try {
        console.log('Requested patient informatin for: ', payload.name);
        res.send(payload);
    } catch (err) {
        console.log(err);
    }
})

patientRouter.post('/:id/entries', (req, res) => {
    const id: string = uuidv4();
    let patient = patients.find((x: Patient) => {
        return x.id === req.params.id;
    });

    let reqBody: Entry = { id: id, ...req.body };
    
    try {
        patient?.entries.unshift(reqBody);
        res.json(reqBody);
    } catch (err) {
        console.log(err);
    }
})

export default patientRouter;