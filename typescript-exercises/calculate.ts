type Operation = 'multiply' | 'add' | 'divide';
type Result = number;

const calculator = (a: number, b: number, op : Operation): Result => {
    switch(op) {
        case 'multiply':
            return a * b;
        case 'add':
            return a + b;
        case 'divide':
            return a / b;
        default:
            throw new Error('Operation is not multiply add or divide')
    }
}

try {
    console.log(calculator(1, 5, 'divide'));
} catch (error: unknown) {
    let errorMessage = 'Something went terribly wrong.';
    if (error instanceof Error) {
        errorMessage += `Error: ${error.message}`;
    }
    console.log(errorMessage, 'ok');
}