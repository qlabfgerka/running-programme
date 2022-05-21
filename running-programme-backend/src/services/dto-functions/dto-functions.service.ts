import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Exercise } from 'src/models/exercise/exercise.model';
import { Plan } from 'src/models/plan/plan.model';
import { User, UserDocument } from 'src/models/user/user.model';

@Injectable()
export class DtoFunctionsService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  public async userToDTO(user: User): Promise<User> {
    if (!user) return undefined;
    const userDTO: User = {
      id: user.id,
      email: user.email,
      username: user.username,
    };

    return userDTO;
  }

  public async exerciseToDTO(exercise: Exercise): Promise<Exercise> {
    const exerciseDTO: Exercise = {
      id: exercise.id,
      currentMinutes: exercise.currentMinutes,
      currentSeconds: exercise.currentSeconds,
      frequency: exercise.frequency,
      goalDate: exercise.goalDate,
      goalMinutes: exercise.goalMinutes,
      goalSeconds: exercise.goalSeconds,
      name: exercise.name,
      distance: exercise.distance,
      status: exercise.status,
      user: await this.userToDTO(await this.getUser(exercise.user)),
      plans: await this.plansToDTO(exercise.plans),
    };

    return exerciseDTO;
  }

  public async exercisesToDTO(
    exercises: Array<Exercise>,
  ): Promise<Array<Exercise>> {
    const exercisesDTO = new Array<Exercise>();

    for (const exercise of exercises) {
      exercisesDTO.push(await this.exerciseToDTO(exercise));
    }

    return exercisesDTO;
  }

  public plansToDTO(plans: Array<Plan>): Array<Plan> {
    const plansDTO = new Array<Plan>();

    for (const plan of plans) {
      plansDTO.push(this.planToDTO(plan));
    }

    return plansDTO;
  }

  public planToDTO(plan: Plan): Plan {
    const planDTO: Plan = {
      id: plan.id,
      time: plan.time,
      date: plan.date,
      completed: plan.completed,
      timeSpent: plan.timeSpent,
    };
    return planDTO;
  }

  private async getUser(user: User): Promise<User> {
    if (!user) return undefined;
    if (user.username) return await this.userModel.findById(user.id);
    return await this.userModel.findById(user.toString());
  }
}
