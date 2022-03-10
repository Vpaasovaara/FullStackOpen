export const calculateBMI = (height: number, weight: number): string => {
    const result: number = weight / ((height / 100) * (height / 100))
    if (result < 25) {
        return 'Normal BMI'
    } else if (result > 25 && result < 29) {
        return 'Overweight'
    } else if (result >= 30) {
        return 'Obese'
    } else {
        throw new Error('Invalid input')
    }
}

interface HeightWeight {
    height: number,
    weight: number
}

const parseArgsBMI = (args: Array<String>): HeightWeight => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!')
    }
}

try {
    const { height, weight } = parseArgsBMI(process.argv);
    console.log(calculateBMI(height, weight));
} catch (error: unknown) {
    let errorMessage = ' Something went wrong. ';
    if (error instanceof Error) {
        errorMessage += `Error: ${error.message}`;
    }
    console.log(errorMessage);
}
