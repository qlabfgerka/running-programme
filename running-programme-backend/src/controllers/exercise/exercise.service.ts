import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Exercise, ExerciseDocument } from 'src/models/exercise/exercise.model';
import { User, UserDocument } from 'src/models/user/user.model';
import { Model } from 'mongoose';
import { DtoFunctionsService } from 'src/services/dto-functions/dto-functions.service';

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
    const frequency: number = 5;

    console.log(startDate);
    console.log(endDate);
    console.log(this.getNDates(startDate, endDate, frequency));
  }

  private getNDates(
    startDate: Date,
    endDate: Date,
    frequency: number,
  ): Array<Date> {
    const dates: Array<Date> = new Array();
    const days = [0, 1, 2, 3, 4, 5, 6];

    for (let i = 0; i < 7 - frequency; i++) {
      days.splice(this.generateRandomNumber(0, days.length - 1), 1);
    }

    dates.push(new Date(startDate));
    startDate.setDate(startDate.getDate() + 1);
    while (startDate < endDate) {
      if (days.includes(startDate.getDay())) dates.push(new Date(startDate));

      startDate.setDate(startDate.getDate() + 1);
    }
    dates.push(endDate);

    return dates;
  }

  private generateRandomNumber(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
