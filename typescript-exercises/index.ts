import express from 'express';
import { calculateBMI } from './bmiCalculator';
import { calculateExercise, Obj } from './exerciseCalculator';
const app = express();

app.use(express.urlencoded({ extended: false }))

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
    let height: number = Number(req.query.height);
    let weight: number = Number(req.query.weight);
    
    if (isNaN(height) || isNaN(weight)) { 
      res.json({ error: 'Input must be a valid number' }) 
    } else if (!isNaN(height) && !isNaN(weight)) {
      try {
        let response: string = calculateBMI(height, weight)
        res.json({ height: height, weight: weight, status: response })
    } catch (error) {
        res.json({ error: 'malformatted parameters' })
    }
  }
});

app.post('/exercises', (req, res) => {
    let daily_exercises: Array<Number> = req.body.exercises.split(/ /).map((x: number) => x = Number(x));
    let target: number = Number(req.body.target);
    let calExercises: Obj = calculateExercise(daily_exercises, target)

    res.json(calExercises)
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});