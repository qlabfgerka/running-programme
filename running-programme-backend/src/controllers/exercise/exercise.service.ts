import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Exercise, ExerciseDocument } from 'src/models/exercise/exercise.model';
import { User, UserDocument } from 'src/models/user/user.model';
import { Model } from 'mongoose';
import { DtoFunctionsService } from 'src/services/dto-functions/dto-functions.service';
import { Plans } from 'src/models/plan/plans.model';
import { Plan } from 'src/models/plan/plan.model';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectModel(Exercise.name)
    private readonly exerciseModel: Model<ExerciseDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly dtoFunctions: DtoFunctionsService,
  ) {}

  public async addExercise(exercise: Exercise, id: string): Promise<Exercise> {
    exercise.user = await this.userModel.findById(id);
    const newExercise = new this.exerciseModel(exercise);
    await newExercise.save();
    return await this.dtoFunctions.exerciseToDTO(newExercise);
  }

  public async getExercises(id: string): Promise<Array<Exercise>> {
    const exercises = await this.exerciseModel.find({ user: id });
    return await this.dtoFunctions.exercisesToDTO(exercises);
  }

  public async getExercise(id: string): Promise<Exercise> {
    const exercise = await this.exerciseModel.findById(id);
    return await this.dtoFunctions.exerciseToDTO(exercise);
  }

  public async getExerciseDates(): Promise<void> {
    const startDate: Date = new Date(2022, 1, 7);
    const endDate: Date = new Date(2022, 1, 22);
    const frequency: number = 3;
    const plans: Plans = this.getNDates(startDate, endDate, frequency);

    plans.plans[0].time = 50;
    plans.plans[plans.plans.length - 1].time = 25;

    const x1 = 0;
    const y1 = plans.plans[0].time;

    const x2 = plans.plans.length - 1;
    const y2 = plans.plans[x2].time;

    for (let i = 1; i < plans.plans.length - 1; i++)
      plans.plans[i].time = this.getValue((y2 - y1) / (x2 - x1), y1, i);

    console.log(plans);
  }

  private getNDates(startDate: Date, endDate: Date, frequency: number): Plans {
    const dates: Plans = new Plans();
    dates.plans = new Array<Plan>();
    const days = [0, 1, 2, 3, 4, 5, 6];

    for (let i = 0; i < 7 - frequency; i++) {
      days.splice(this.generateRandomNumber(0, days.length - 1), 1);
    }

    dates.plans.push({ date: new Date(startDate), time: 0 });
    startDate.setDate(startDate.getDate() + 1);
    while (startDate < endDate) {
      if (days.includes(startDate.getDay()))
        dates.plans.push({ date: new Date(startDate), time: 0 });

      startDate.setDate(startDate.getDate() + 1);
    }
    dates.plans.push({ date: endDate, time: 0 });

    return dates;
  }

  private generateRandomNumber(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  private getValue(slope: number, b: number, x: number): number {
    return slope * x + b;
  }
}
