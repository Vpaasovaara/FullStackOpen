// call the function from terminal
// Test input: npm run calculateExercises 2 0 3 2 1
// each number represents hours of exercise per work day

export type Obj = {
    periodLength: number,
    trainingDays: number,
    target: number,
    average: number,
    success: boolean,
    rating: number,
    explanation: string
}

export const calculateExercise = (days: Array<Number>, goal: number = 2.5): Obj => {
    let arr: Array<Number> = days;
    let sum: number = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += Number(arr[i]);
    }
    let average: number = sum / arr.length;
    let rating: number = 0;
    let explain: string = ''
    if (average > 1.5) {
        explain = 'Hours are met'
        rating = 3;
    } else if (average > 1 && average < 1.5) {
        explain = 'Hours are lacking a bit'
        rating = 2;
    } else {
        explain = 'Hours are way off'
        rating = 1;
    }


    let target = {
        periodLength: arr.length,
        trainingDays: days.filter((day: number) => day > 0).length,
        target: goal,
        average: average,
        success: average >= 1.5 ? true : false,
        rating: rating,
        explanation: explain
    }
    return target
}

interface ExcerciseDays extends Array<Number>{}

const parseArgs = (args: Array<String>): ExcerciseDays => {
    let response: Array<Number> = [];

    for (let i = 2; i < args.length; i++) {
        if (isNaN(Number(args[i]))) {
            throw new Error(`${args[i]} is not a number`)
        } else {
            response.push(Number(args[i]))
        }
    }
    return response
}

try {
    console.log(process.argv)
    const exDays = parseArgs(process.argv);
    console.log(calculateExercise(exDays));
} catch (error: unknown) {
    let errorMessage = ' Something went wrong. ';
    if (error instanceof Error) {
        errorMessage += `Error: ${error.message}`;
    }
    console.log(errorMessage);
}