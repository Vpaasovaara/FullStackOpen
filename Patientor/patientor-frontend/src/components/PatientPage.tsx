import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import React, { useMemo } from "react";
import axios from "axios";
import { Patient, Entry, Diagnosis, FinderFunction } from "../types";
import { Box, ThemeProvider, createTheme } from '@mui/system';
import { theme } from "../themes";
//import FavoriteIcon from '@mui/icons-material/Favorite';

interface PatientProps {
    diagnoses: any
}

const PatientPage = (props: PatientProps) => {
    const { id } = useParams();
    const [patient, setPatient]: any = React.useState([{
        name: 'name',
        occupation: 'occupation',
        gender: 'male',
        ssn: 'ssn',
        dateOfBirth: '01-01-1999',
        entries: ['entries']
    }])
    const [entries, setEntries]: any = React.useState([]);
    const [diagnoses, setDiagnoses]: any = React.useState(props.diagnoses);

    React.useEffect(() => {
        let isMounted: boolean = true;
        if (isMounted) {
            (async () => {
                const { data: patientFromApi } = await axios.get<Patient>(
                   `${apiBaseUrl}/patients/${id}`
                );
                setPatient(patientFromApi);
                setEntries(patientFromApi.entries);
            })().catch(err => {
                console.log(err);
            })
        }
        return () => { isMounted = false };
    }, []);

    const findDiagnoseName = (code: string) => {
        let diagnose: any = diagnoses.find((diagnose: Diagnosis) => diagnose.code === code);
        
        if (typeof diagnose !== 'undefined') {
            console.log(diagnose.name);
            return diagnose.name
        } else {
            return ""
        }
    }

    const caseNever = (value: never): never => {
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(value)}`
        )
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ color: 'text.primary', marginBottom: '10px', marginTop: '10px' }}>{patient.name}</Box>
            <Box sx={{ color: 'text.primary', marginBottom: '10px' }}>Occupation: {patient.occupation}</Box>
            <Box sx={{ color: 'text.primary', marginBottom: '10px' }}>SSN: {patient.ssn}</Box>
            <Box sx={{ color: 'text.primary', marginBottom: '10px' }}>Entries:</Box>
            {props.diagnoses && entries.map((entry: Entry, i: number) => {
                switch (entry.type) {
                    case 'HealthCheck':
                        return (
                            <Box key={i} sx={{ p: 2, width: 500, minHeight: 150, bgcolor: 'background.sea', borderRadius: 2, marginBottom: '10px', boxShadow: '5px' }}>
                                <Box sx={{ color: 'text.darkBlue' }}>
                                    <b>{entry.date}</b><br/>{entry.description}
                                </Box>
                                <Box sx={{ color: 'text.darkBlue' }}>Health rating: {entry.healthCheckRating}</Box>
                                <ul>
                                    {entry.diagnosisCodes?.map((code: string, y: number) => {
                                        return (
                                            <li key={`${i}${y}`}>{code} {findDiagnoseName(code)}</li>
                                        )
                                    })}
                                </ul>
                                <Box sx={{ color: 'text.darkBlue' }}>Diagnosed by: {entry.specialist}</Box>
                            </Box>
                        )
                    case 'Hospital':
                        return (
                            <Box key={i} sx={{ p: 2, width: 500, minHeight: 150, bgcolor: 'background.sea', borderRadius: 2, marginBottom: '10px', boxShadow: '5px' }}>
                                <Box sx={{ color: 'text.darkBlue' }}>
                                    <b>{entry.date}</b><br/>{entry.description}
                                </Box>
                                <Box sx={{ color: 'text.darkBlue' }}>{entry.discharge.date} {entry.discharge.criteria}</Box>
                                {entry.discharge && <Box key={`${patient.name} ${i}`} sx={{ color: 'text.darkBlue', marginTop: '2px' }}>Discharge Date: <b>{entry.discharge?.date}</b> Discharge criteria: <b>{entry.discharge?.criteria}</b></Box>}
                                <ul>
                                    {entry.diagnosisCodes?.map((code: string, y: number) => {
                                        return (
                                            <li key={`${i}${y}`}>{code} {findDiagnoseName(code)}</li>
                                        )
                                    })}
                                </ul>
                                <Box sx={{ color: 'text.darkBlue' }}>Diagnosed by: {entry.specialist}</Box>
                            </Box>
                        )
                    case 'OccupationalHealthcare':
                        return (
                            <Box key={i} sx={{ p: 2, width: 500, minHeight: 150, bgcolor: 'background.sea', borderRadius: 2, marginBottom: '10px', boxShadow: '5px' }}>
                                <Box sx={{ color: 'text.darkBlue' }}>
                                    <b>{entry.date}</b><br/>{entry.description}
                                </Box>
                                <Box sx={{ color: 'text.darkBlue', marginTop: '2px' }}>Employer: <b>{entry.employerName}</b></Box>
                                {entry.sickLeave?.startDate && <Box sx={{ color: 'text.darkBlue', marginTop: '2px' }}>Sickleave Started: <b>{entry.sickLeave?.startDate}</b> Ended: <b>{entry.sickLeave?.endDate}</b></Box>}
                                <ul>
                                    {entry.diagnosisCodes?.map((code: string, y: number) => {
                                        return (
                                            <li key={`${i}${y}`}>{code} {findDiagnoseName(code)}</li>
                                        )
                                    })}
                                </ul>
                                <Box sx={{ color: 'text.darkBlue' }}>Diagnosed by: {entry.specialist}</Box>
                            </Box>
                        )
                    default:
                        caseNever(entry);
                }
            })}
        </ThemeProvider>
    )
}

export default PatientPage;




function find(arg0: (diagnose: Diagnosis) => boolean): any {
    throw new Error("Function not implemented.");
}
/*
    <Box sx={{ p: 2, width: 500, minHeight: 150, bgcolor: 'background.sea', borderRadius: 2, marginBottom: '10px', boxShadow: '5px' }}>
                        <Box key={`${patient.name} ${i}`} sx={{ color: 'text.darkBlue' }}>
                            <b>{entry.date}</b><br/>{entry.description}
                        </Box>
                        <ul>
                            {entry.diagnosisCodes?.map((code: string, i: number) => {
                                return (
                                    <li key={`${i}`}>{code} {findDiagnoseName(code)}</li>
                                )
                            })}
                        </ul>
                    </Box>
*/