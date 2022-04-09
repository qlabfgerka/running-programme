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
}
